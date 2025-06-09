import { Suspense } from "react";
import TasksOfProject from "./TasksOfProject";
import ProjectDetail from "./ProjectDetail";

export default function ProjectDetailPage({ searchParams }) {
  const projectId = searchParams.projectId;
  return (
    <div className="w-full flex flex-col md:flex-row ">
      <Suspense fallback={<div>Chargement des tâches...</div>}>
        <TasksOfProject projectId={projectId} />
      </Suspense>
      <Suspense fallback={<div>Chargement des détails du projet...</div>}>
        <ProjectDetail projectId={projectId} />
      </Suspense>
    </div>
  );
}
