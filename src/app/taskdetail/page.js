import { Suspense } from "react";
import TaskDetail from "./TaskDetail";

export default function TaskDetailPage() {
  return (
    <Suspense fallback={<div>Chargement du détail de la tâche...</div>}>
      <TaskDetail />
    </Suspense>
  );
}
