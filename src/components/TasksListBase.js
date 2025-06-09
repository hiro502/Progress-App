"use client";

import { useFilter } from "@/contexte/FilterContext";

export default function TasksListBase({ tasks, children }) {
  const { filterType, sortType } = useFilter();

  // Filters
  const filteredTasks = tasks.filter((task) => {
    const progress = Number(task.taskProgress);
    if (filterType === "all") return true;
    if (filterType === "completed") return progress === 100;
    if (filterType === "incomplete") return progress < 100;
    return true;
  });

  // sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate.toDate());
    const dateB = new Date(b.dueDate.toDate());

    switch (sortType) {
      case "dueAsc":
        return dateA - dateB;
      case "dueDesc":
        return dateB - dateA;
      case "progressAsc":
        return a.taskProgress - b.taskProgress;
      case "progressDesc":
        return b.taskProgress - a.taskProgress;
      default:
        return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  return (
    <ul className="w-full md:w-[90%] ">
      {sortedTasks.map((task) => (
        <li key={`${task.taskId}`} className="w-full  flex justify-center mb-3">
          {children(task)}
        </li>
      ))}
    </ul>
  );
}
