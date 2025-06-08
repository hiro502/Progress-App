"use client";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/contexte/DataContext";
import { arrayUnion, Timestamp } from "firebase/firestore";
export default function TodaysTaskCard({
  projectId,
  projectName,
  taskName,
  taskProgress,
  dueDate,
  dailyProgress,
  taskId,
  userId,
}) {
  const inputRef = useRef();
  const router = useRouter();
  const { reloadData } = useData();
  /* date calculate  */

  const displayDueDate = new Date(dueDate.toDate()).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  /* update progress */

  const handleProgressUpdate = async () => {
    const inputValue = Number(inputRef.current.value);
    if (!inputValue || inputValue < 1) {
      alert("Veuillez entrer un entier supérieur ou égal à 1.");
      return;
    }

    const newProgress = Math.min(taskProgress + inputValue, 100);

    try {
      const taskRef = doc(
        db,
        "users",
        userId,
        "projects",
        projectId,
        "tasks",
        taskId
      );
      await updateDoc(taskRef, {
        taskProgress: newProgress,
        doneDays: arrayUnion(Timestamp.now()),
      });
      reloadData();
      alert("Progrès mis à jour.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:max-w-[870px] bg-slate-300 h-auto min-h-[140px] rounded-xl flex flex-col lg:flex-row items-stretch justify-between px-2 py-2 shadow-sm shadow-gray-50 ">
      <div
        className="flex flex-col justify-center flex-1 lg:flex-5 px-3 min-w-0 cursor-pointer"
        onClick={() => {
          router.push(`/taskdetail?taskId=${taskId}`);
        }}
      >
        <div className="flex justify-between">
          <div className="text-base overflow-hidden text-ellipsis mx-1 mt-1">
            {projectName}
          </div>
          <div className="text-base lg:text-lg lg:mb-0">
            Date limite: {displayDueDate}
          </div>
        </div>

        <div className="flex justify-between items-center mx-1 my-2">
          <div className="text-xl lg:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis mr-4">
            {taskName}
          </div>
          <div className="text-xl lg:text-2xl text-center flex-none">
            {taskProgress}%
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-w-0 mx-1 mb-2">
          <div className="bg-white w-full h-[20px] rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${taskProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full lg:flex-col lg:flex-1 lg:w-auto px-3 py-1 lg:border-l lg:border-white/20 lg:pl-4  text-right">
        <label
          htmlFor="todayProgress"
          className="flex items-center lg:flex-col lg:items-end mt-2"
        >
          <span>Avancement :</span>
          <div className="flex items-center lg:mt-2">
            <input
              ref={inputRef}
              type="number"
              id="todayProgress"
              name="todayProgress"
              min="1"
              max={100 - taskProgress}
              defaultValue={dailyProgress}
              className="bg-white rounded-md text-right w-10 xl:ml-2 lg:ml-11  ml-2 mr-1"
            />
            <span>%</span>
          </div>
        </label>

        <button
          onClick={handleProgressUpdate}
          className="bg-white px-2 ring-2 rounded-lg"
        >
          Valider
        </button>
      </div>
    </div>
  );
}
