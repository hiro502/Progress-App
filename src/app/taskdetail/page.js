import { Suspense } from "react";
import TaskDetail from "./TaskDetail";

export default function TaskDetailPage({ searchParams }) {
  const taskId = searchParams.taskId;

  return (
    <Suspense fallback={<div>Chargement du détail de la tâche...</div>}>
      <TaskDetail taskId={taskId} />
    </Suspense>
  );
}
