"use client";

import ProjectCard from "@/components/card/ProjectCard";
import { useFilter } from "@/contexte/FilterContext";
import { useData } from "@/contexte/DataContext";

export default function ProjectsList() {
  const { projects } = useData();

  const { filterType, sortType, selectedTags } = useFilter();

  const calculateProjectProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const total = tasks.reduce((sum, t) => sum + t.taskProgress, 0);
    return Math.round(total / tasks.length);
  };

  const projectsWithProgress = projects.map((project) => ({
    ...project,
    projectProgress: calculateProjectProgress(project.tasks || []),
  }));

  const filteredProjects = projectsWithProgress.filter((project) => {
    let typeFilterPass = true;
    if (filterType === "Completed") {
      typeFilterPass = project.projectProgress === 100;
    } else if (filterType === "Incomplete") {
      typeFilterPass = project.projectProgress < 100;
    }

    const tagFilterPass =
      selectedTags.length === 0 || selectedTags.includes(project.tagColor);

    return typeFilterPass && tagFilterPass;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = new Date(a.dueDate.toDate());
    const dateB = new Date(b.dueDate.toDate());
    switch (sortType) {
      case "dueAsc":
        return dateA - dateB;
      case "dueDesc":
        return dateB - dateA;
      case "progressAsc":
        return a.projectProgress - b.projectProgress;
      case "progressDesc":
        return b.projectProgress - a.projectProgress;
      default:
        return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  return sortedProjects.length === 0 ? (
    <p className="text-center text-2xl mt-3 pb-3 border-b-[1px] text-gray-500">
      Il n&apos;y a aucun projet.
    </p>
  ) : (
    <>
      <ul className="w-full md:w-[90%] ">
        {sortedProjects.map((project) => {
          return (
            <li
              key={project.projectId}
              className="w-full  flex justify-center mb-3"
            >
              <ProjectCard
                tagColor={project.tagColor}
                projectName={project.projectName}
                projectId={project.projectId}
                dueDate={project.dueDate}
                progressProject={project.projectProgress}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
