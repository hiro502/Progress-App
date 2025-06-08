"use client";
import { useState, useEffect } from "react";
import { useData } from "@/contexte/DataContext";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import AddTaskModal from "@/components/modals/AddTaskModal";
import {
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";

const tagOptions = [
  { color: "bg-gray-500", label: "gray" },
  { color: "bg-red-500", label: "red" },
  { color: "bg-green-500", label: "green" },
  { color: "bg-blue-500", label: "blue" },
  { color: "bg-yellow-200", label: "yellow" },
  { color: "bg-purple-500", label: "purple" },
];

export default function ProjectDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { projects, tasks, reloadData } = useData();

  const project = projects.find((t) => t.projectId === projectId);

  const tasksOfProject = tasks.filter((t) => t.projectId === projectId);

  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [tagColor, setTagColor] = useState("");

  useEffect(() => {
    if (project) {
      setProjectName(project.projectName);
      setDueDate(project.dueDate.toDate().toISOString().substring(0, 10));
      setProjectDetail(project.projectDetail || "");
      setTagColor(project.tagColor || "gray");
    }
  }, [project]);

  const handleUpdate = async () => {
    if (!projectName) {
      alert("Veuillez saisir le nom du projet");
      return;
    }
    if (!dueDate) {
      alert("Veuillez saisir la date limite");
      return;
    }
    try {
      const projectRef = doc(
        db,
        "users",
        project.userId,
        "projects",
        project.projectId
      );

      await updateDoc(projectRef, {
        projectName,
        dueDate: new Date(dueDate),
        projectDetail,
        tagColor,
      });

      alert("Projet mise à jour avec succès");
      reloadData();
      router.back();
    } catch (error) {
      console.error(error);
      alert("Échec de la mise à jour");
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm(
      "Voulez-vous vraiment supprimer ce projet ?\nToutes les tâches associées seront également supprimées."
    );
    if (!confirmation) return;

    try {
      const tasksRef = collection(
        db,
        "users",
        project.userId,
        "projects",
        project.projectId,
        "tasks"
      );
      const tasksSnap = await getDocs(tasksRef);

      const deleteTasks = tasksSnap.docs.map((taskDoc) =>
        deleteDoc(taskDoc.ref)
      );
      await Promise.all(deleteTasks);

      const projectRef = doc(
        db,
        "users",
        project.userId,
        "projects",
        project.projectId
      );
      await deleteDoc(projectRef);

      alert("Projet supprimé");
      reloadData();
      router.back();
    } catch (error) {
      console.error(error);
      alert("Échec de la suppression");
    }
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Détails et modification du projet
      </h2>

      <label className="block mb-2">
        Nom du projet :
        <input
          className="border rounded px-2 py-1 w-full"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </label>
      <div>
        <h3 className="text-base font-normal mb-1">
          Couleur de l&apos;étiquette
        </h3>
        <div className="flex gap-2 mt-2">
          {tagOptions.map((tag) => (
            <button
              key={tag.label}
              type="button"
              className={`w-8 h-8 rounded-full ${
                tag.color
              } focus:outline-none ring-2 ${
                tagColor === tag.label
                  ? "ring-black dark:ring-black"
                  : "ring-transparent"
              }`}
              onClick={() => setTagColor(tag.label)}
              aria-label={tag.label}
              title={tag.label}
            />
          ))}
        </div>
      </div>
      <label className="block mb-4">
        Détails :
        <textarea
          value={projectDetail}
          onChange={(e) => setProjectDetail(e.target.value)}
          rows={4}
          className="border rounded px-2 py-1 w-full resize-none"
          placeholder="Entrez les détails du projet"
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

      <div className="flex justify-between">
        <AddTaskModal projectId={projectId} />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Modifier
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleDelete}
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
    </div>
  );
}
