import { useRouter } from "next/navigation";

export default function TaskCard({
  projectName,
  taskId,
  taskName,
  taskProgress,
  dueDate,
}) {
  const router = useRouter();

  /* date calculate code */

  const displayDueDate = new Date(dueDate.toDate()).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

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
      className="w-full lg:max-w-[870px] bg-slate-300 h-auto min-h-[140px] rounded-xl flex flex-col lg:flex-row items-stretch justify-between px-2 py-2 shadow-sm shadow-gray-500 cursor-pointer"
      onClick={() => {
        router.push(`/taskdetail?taskId=${taskId}`);
      }}
    >
      <div className="flex flex-col justify-center flex-1 lg:flex-5 px-3 min-w-0">
        {/* project name, taskname, task progress */}
        <div className="text-base overflow-hidden text-ellipsis mx-1 mt-1">
          {projectName}
        </div>
        <div className="flex justify-between items-center mx-1 my-2">
          <div className="text-xl lg:text-2xl font-bold overflow-hidden text-ellipsis mr-4">
            {taskName}
          </div>
          <div className="text-xl lg:text-2xl text-center flex-none">
            {taskProgress}%
          </div>
        </div>
        {/* progressbar */}
        <div className="flex flex-col items-center justify-center min-w-0 mx-1 mb-2">
          <div className="bg-white w-full h-[20px] rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${taskProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* date limit */}
      <div className="flex flex-row justify-between w-full lg:flex-col lg:flex-1 lg:w-auto px-3 py-1 lg:border-l lg:border-white/20 lg:pl-4">
        <div className="text-base lg:text-lg  lg:mb-0">
          Date limite: {displayDueDate}
        </div>
        <div className="text-base lg:text-lg">
          {taskProgress === 100 ? "Bon travail!!" : daysRemainingText}
        </div>
      </div>
    </div>
  );
}
