"use client";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { useData } from "@/contexte/DataContext";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
  Textarea,
} from "flowbite-react";

const tagOptions = [
  { color: "bg-gray-500", label: "gray" },
  { color: "bg-red-500", label: "red" },
  { color: "bg-green-500", label: "green" },
  { color: "bg-blue-500", label: "blue" },
  { color: "bg-yellow-200", label: "yellow" },
  { color: "bg-purple-500", label: "purple" },
];

export default function AddProjectModal() {
  const [openModal, setOpenModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [tagColor, setTagColor] = useState("gray");
  const [projectDetail, setProjectDetail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { user, reloadData } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User non connecté");
      return;
    }

    if (!projectName || !dueDate) {
      alert("Veuillez remplir le nom du projet et la date limite.");
      return;
    }

    const newProject = {
      projectName,
      tagColor,
      projectDetail,
      createdAt: new Date(),
      dueDate: new Date(dueDate),
    };

    try {
      const projectCollectionRef = collection(
        db,
        "users",
        user.uid,
        "projects"
      );
      await addDoc(projectCollectionRef, newProject);
    } catch (error) {
      console.error("Echec de la création du project :", error);
    }

    setProjectName("");
    setTagColor("gray");
    setProjectDetail("");
    setDueDate("");
    setOpenModal(false);

    reloadData();
  };

  return (
    <>
      {user ? (
        <Button
          color="none"
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white h-[32px] ml-3 px-3 py-1"
        >
          Créer un projet
        </Button>
      ) : (
        <></>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="!bg-slate-300 !border-gray-400">
          <span className="!text-black dark:!text-black text-xl font-medium">
            Ajouter un nouveau projet
          </span>
        </ModalHeader>
        <ModalBody className="!bg-slate-300 !text-black">
          <form className="space-y-6">
            {/* Project Name */}
            <div>
              <h3 className="text-base font-normal mb-1">Nom du projet</h3>
              <TextInput
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                color="light"
                className="mt-1 !bg-white rounded-lg"
              />
            </div>

            {/* Tag Color */}
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

            {/* Project Detail */}
            <div>
              <h3 className="text-base font-normal mb-1">Détails du projet</h3>
              <Textarea
                id="project-detail"
                value={projectDetail}
                onChange={(e) => setProjectDetail(e.target.value)}
                rows={4}
                color="light"
                className="mt-1 !bg-white "
              />
            </div>

            {/* Due Date */}
            <div>
              <h3 className="text-base font-normal mb-1">Date limite</h3>
              <TextInput
                id="due-date"
                type="date"
                value={dueDate}
                color="light"
                required
                onChange={(e) => setDueDate(e.target.value)}
                className="text-base mt-1 !bg-white !text-black rounded-lg"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="!bg-slate-300 flex justify-end border-t-0">
          <Button onClick={handleSubmit}>Ajouter</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
