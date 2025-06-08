"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useData } from "@/contexte/DataContext";
import { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const daysOfWeek = [
  { label: "Dim", value: 0 },
  { label: "Lun", value: 1 },
  { label: "Mar", value: 2 },
  { label: "Mer", value: 3 },
  { label: "Jeu", value: 4 },
  { label: "Ven", value: 5 },
  { label: "Sam", value: 6 },
];

export default function TaskDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const { tasks, reloadData } = useData();

  const task = tasks.find((t) => t.taskId === taskId);

  const [taskName, setTaskName] = useState("");
  const [taskProgress, setTaskProgress] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState([]);

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setTaskProgress(task.taskProgress);
      setDueDate(task.dueDate.toDate().toISOString().substring(0, 10));
      setTaskDetail(task.taskDetail || "");
      setDayOfWeek(task.dayOfWeek || []);
    }
  }, [task]);

  if (!task) {
    return <div>Tâche introuvable (ou en cours de chargement)</div>;
  }

  const handleDayToggle = (value) => {
    setDayOfWeek((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleUpdate = async () => {
    if (!taskName) {
      alert("Veuillez saisir le nom de la tâche");
      return;
    }
    if (taskProgress < 0 || taskProgress > 100) {
      alert("La progression doit être comprise entre 0 et 100");
      return;
    }
    if (!dueDate) {
      alert("Veuillez saisir la date limite");
      return;
    }
    if (dayOfWeek.length === 0) {
      alert("Veuillez sélectionner au moins un jour de la semaine");
      return;
    }

    try {
      const taskRef = doc(
        db,
        "users",
        task.userId,
        "projects",
        task.projectId,
        "tasks",
        task.taskId
      );
      await updateDoc(taskRef, {
        taskName,
        taskProgress: Number(taskProgress),
        dueDate: new Date(dueDate),
        taskDetail,
        dayOfWeek,
      });
      alert("Tâche mise à jour avec succès");
      reloadData();
      router.back();
    } catch (error) {
      console.error(error);
      alert("Échec de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Voulez-vous vraiment supprimer cette tâche ?")) return;

    try {
      const taskRef = doc(
        db,
        "users",
        task.userId,
        "projects",
        task.projectId,
        "tasks",
        task.taskId
      );
      await deleteDoc(taskRef);
      alert("Tâche supprimée");
      reloadData();
      router.back();
    } catch (error) {
      console.error(error);
      alert("Échec de la suppression");
    }
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Détails et modification de la tâche
      </h1>

      <label className="block mb-2">
        Nom de la tâche :
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </label>

      <label className="block mb-4">
        Détails :
        <textarea
          value={taskDetail}
          onChange={(e) => setTaskDetail(e.target.value)}
          rows={4}
          className="border rounded px-2 py-1 w-full resize-none"
          placeholder="Entrez les détails de la tâche"
        />
      </label>

      <label className="block mb-4">
        Progression : {taskProgress ? taskProgress : 0}%
        <input
          type="range"
          min="0"
          max="100"
          value={taskProgress ? taskProgress : 0}
          onChange={(e) => setTaskProgress(e.target.value)}
          className="w-full"
        />
      </label>

      <label className="block mb-4">
        Date limite :
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </label>

      <fieldset className="mb-4">
        <legend className="mb-2 font-semibold">Jours de la semaine :</legend>
        <div className="flex flex-wrap gap-4">
          {daysOfWeek.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dayOfWeek.includes(value)}
                onChange={() => handleDayToggle(value)}
                className="w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Modifier
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer
        </button>

        <button
          onClick={() => router.back()}
          className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
        >
          Retour
        </button>
      </div>
    </div>
  );
}
