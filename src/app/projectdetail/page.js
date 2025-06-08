import ProjectDetail from "./ProjectDetail";
import TasksOfProject from "./TasksOfProject";

export default function ProjectDetailPage() {
  return (
    <div className="w-full flex">
      <TasksOfProject />
      <ProjectDetail />
    </div>
  );
}
