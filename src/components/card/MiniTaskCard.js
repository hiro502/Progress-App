import { useRouter } from "next/navigation";

export default function MiniTaskCard({
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

  return (
    <div
      className="w-full   bg-slate-300 h-auto  rounded-xl flex flex-col justify-between px-4 py-2 shadow-sm shadow-gray-500 cursor-pointer"
      onClick={() => {
        router.push(`/taskdetail?taskId=${taskId}`);
      }}
    >
      <div className="flex justify-between">
        <div className="text-xl  font-bold overflow-hidden text-ellipsis mr-4">
          {taskName}
        </div>
        <div className="text-base ">Avant: {displayDueDate}</div>
      </div>

      <div className="flex items-center justify-center min-w-0  ">
        <div className="bg-white w-full h-[15px] rounded-full overflow-hidden mr-4">
          <div
            className="bg-blue-500 h-full rounded-full"
            style={{ width: `${taskProgress}%` }}
          ></div>
        </div>

        <div className="text-base  text-black whitespace-nowrap">
          {taskProgress}%
        </div>
      </div>
    </div>
  );
}
