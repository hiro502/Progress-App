import { Suspense } from "react";
import TasksOfProject from "./TasksOfProject";
import ProjectDetail from "./ProjectDetail";

export default function ProjectDetailPage() {
  return (
    <div className="w-full flex">
      <Suspense fallback={<div>Chargement des tâches...</div>}>
        <TasksOfProject />
      </Suspense>
      <Suspense fallback={<div>Chargement des détails du projet...</div>}>
        <ProjectDetail />
      </Suspense>
    </div>
  );
}
