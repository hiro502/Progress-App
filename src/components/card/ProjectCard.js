import { useRouter } from "next/navigation";

export default function ProjectCard({
  tagColor,
  projectId,
  projectName,
  dueDate,
  progressProject,
}) {
  const router = useRouter();

  const displayDueDate = new Date(dueDate.toDate()).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  /* date calculate code*/

  const calculateDays = (limitDateStr) => {
    const today = new Date();
    const limitDate = new Date(limitDateStr);
    today.setHours(0, 0, 0, 0);
    limitDate.setHours(0, 0, 0, 0);

    const daysRemaining = Math.floor(
      (limitDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysRemaining < 0) {
      return "Échec !!";
    } else if (daysRemaining === 0) {
      return "Aujourd'hui";
    } else {
      return `Il reste ${daysRemaining} jours`;
    }
  };
  const daysRemainingText = calculateDays(dueDate.toDate());

  return (
    <div
      className="w-full lg:max-w-[870px] bg-slate-300 min-h-[140px] h-auto rounded-xl flex flex-col lg:flex-row items-stretch justify-between px-3 py-2 shadow-sm shadow-gray-500 cursor-pointer"
      onClick={() => {
        router.push(`/projectdetail?projectId=${projectId}`);
      }}
    >
      <div className="flex flex-col justify-center flex-1 lg:flex-5 px-3 min-w-0">
        <div className="flex items-center justify-between mx-1 my-2 gap-2">
          {/* Icon */}
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.8em"
              height="1.8em"
              viewBox="0 0 24 24"
              color={tagColor}
            >
              <path
                fill="currentColor"
                d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h11q.475 0 .9.213t.7.587L22 12l-5.4 7.2q-.275.375-.7.588T15 20z"
              />
            </svg>
          </div>

          {/* Project name */}
          <div className="text-xl lg:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis flex-1">
            {projectName}
          </div>

          {/* Progress % */}
          <div className="text-lg lg:text-2xl  flex-shrink-0 text-right">
            {progressProject}%
          </div>
        </div>

        {/* progressbar */}
        <div className="flex flex-col items-center justify-center mx-1 my-2">
          <div className="bg-white w-full h-[20px] rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${progressProject}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* date limit */}
      <div className="flex flex-row justify-between w-full lg:flex-col lg:flex-1 lg:w-auto p-2 lg:border-l lg:border-white/20 lg:pl-4">
        <div className="text-base lg:text-lg mb-1 lg:mb-0">
          Date limite: {displayDueDate}
        </div>
        <div className="text-base lg:text-lg">
          {progressProject === 100 ? "Bravo terminé!!" : daysRemainingText}
        </div>
      </div>
    </div>
  );
}
