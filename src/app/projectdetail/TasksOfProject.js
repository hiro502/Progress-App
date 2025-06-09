"use client";
import MiniTaskCard from "@/components/card/MiniTaskCard";
import { useData } from "@/contexte/DataContext";

export default function TasksOfProject({ projectId }) {
  const { tasks } = useData();

  const tasksOfProject = tasks.filter((t) => t.projectId === projectId);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tâches du projet</h2>

      {tasksOfProject.length === 0 ? (
        <p className="text-center text-2xl mt-5 pb-3  text-gray-500">
          Ajoutez des tâches
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-1">
          {tasksOfProject.map((task) => (
            <li key={`${task.taskId}`} className="flex justify-center">
              <MiniTaskCard
                taskName={task.taskName}
                taskProgress={task.taskProgress}
                dueDate={task.dueDate}
                taskId={task.taskId}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
