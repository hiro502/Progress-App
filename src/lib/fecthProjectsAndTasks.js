import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchProjectsAndTasks(userId) {
  const projectsRef = collection(db, "users", userId, "projects");
  const projectSnap = await getDocs(projectsRef);

  const projects = [];
  const allTasks = [];

  for (const projectDoc of projectSnap.docs) {
    const projectId = projectDoc.id;
    const data = projectDoc.data();

    const tasksRef = collection(
      db,
      "users",
      userId,
      "projects",
      projectId,
      "tasks"
    );

    const taskSnap = await getDocs(tasksRef);

    const tasks = taskSnap.docs.map((doc) => {
      const task = {
        taskId: doc.id,
        userId,
        projectId,
        projectName: data.projectName,
        ...doc.data(),
      };
      allTasks.push(task);
      return task;
    });

    projects.push({
      projectId,
      userId,
      ...data,
      tasks: tasks || [],
    });
  }

  return { projects, tasks: allTasks };
}
