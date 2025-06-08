"use client";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useData } from "@/contexte/DataContext";
import TodaysTaskCard from "@/components/card/TodaysTaskCard";
import TasksListBase from "@/components/TasksListBase";

export default function TodaysTasks() {
  const { user, todaysTasks, setTodaysTasks } = useData();

  useEffect(() => {
    if (!user) return;

    const today = new Date().getDay();
    const tasksMap = {};
    const unsubscribes = [];

    async function subscribe() {
      const projectsRef = collection(db, "users", user.uid, "projects");
      const projectSnap = await getDocs(projectsRef);

      projectSnap.docs.forEach((projectDoc) => {
        const userId = user.uid;
        const projectId = projectDoc.id;
        const projectName = projectDoc.data().projectName;

        const tasksRef = collection(
          db,
          "users",
          userId,
          "projects",
          projectId,
          "tasks"
        );
        const q = query(
          tasksRef,
          where("dayOfWeek", "array-contains", today),
          where("taskProgress", "<", 100)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const todayStr = new Date().toISOString().split("T")[0];

          const tasks = snapshot.docs
            .map((doc) => ({
              taskId: doc.id,
              userId,
              projectId,
              projectName,
              ...doc.data(),
            }))
            .filter((task) => {
              const doneDays = task.doneDays || [];
              const doneDayStrings = doneDays.map(
                (ts) => ts.toDate().toISOString().split("T")[0]
              );
              return !doneDayStrings.includes(todayStr);
            });

          tasksMap[projectId] = tasks;

          const allTasks = Object.values(tasksMap).flat();
          setTodaysTasks(allTasks);
        });

        unsubscribes.push(unsubscribe);
      });
    }

    subscribe();

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [user, setTodaysTasks]);

  return todaysTasks.length === 0 ? (
    <p className="text-center text-2xl mt-3 pb-3 border-b-[1px] text-gray-500">
      Il n&apos;y a pas de tâche à faire pour aujourd&apos;hui.
    </p>
  ) : (
    <TasksListBase tasks={todaysTasks}>
      {(task) => (
        <TodaysTaskCard
          key={task.taskId}
          taskName={task.taskName}
          projectId={task.projectId}
          projectName={task.projectName}
          taskProgress={task.taskProgress}
          dueDate={task.dueDate}
          dailyProgress={task.dailyProgress}
          taskId={task.taskId}
          userId={task.userId}
        />
      )}
    </TasksListBase>
  );
}
