"use client";

import TaskCard from "@/components/card/TaskCard";
import TasksListBase from "@/components/TasksListBase";
import { useData } from "@/contexte/DataContext";

export default function TasksList() {
  const { tasks } = useData();
  return tasks.length === 0 ? (
    <p className="text-center text-2xl mt-3 pb-3 border-b-[1px] text-gray-500">
      Il n&apos;y a aucune tâche.
    </p>
  ) : (
    <TasksListBase tasks={tasks}>
      {(task) => (
        <TaskCard
          taskName={task.taskName}
          projectName={task.projectName}
          taskProgress={task.taskProgress}
          dueDate={task.dueDate}
          taskId={task.taskId}
        />
      )}
    </TasksListBase>
  );
}
