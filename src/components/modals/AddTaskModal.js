"use client";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { useData } from "@/contexte/DataContext";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";

const weekDays = [
  { label: "Dim", value: 0 },
  { label: "Lun", value: 1 },
  { label: "Mar", value: 2 },
  { label: "Mer", value: 3 },
  { label: "Jeu", value: 4 },
  { label: "Ven", value: 5 },
  { label: "Sam", value: 6 },
];

export default function AddTaskModal({ projectId }) {
  const { user, reloadData } = useData();
  const [openModal, setOpenModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dailyProgress, setDailyProgress] = useState(0);
  const [dayOfWeek, setDayOfWeek] = useState([]);

  const handleCheckboxChange = (value) => {
    setDayOfWeek((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !dueDate) {
      alert("Veuillez remplir le nom de la tâche et la date limite.");
      return;
    }

    const newTask = {
      projectId,
      taskName,
      taskDetail,
      dueDate: new Date(dueDate),
      taskProgress: Number(0),
      dailyProgress: Number(dailyProgress),
      dayOfWeek,
      doneDays: [],
      createdAt: new Date(),
    };

    try {
      const taskCollectionRef = collection(
        db,
        "users",
        user.uid,
        "projects",
        projectId,
        "tasks"
      );

      await addDoc(taskCollectionRef, newTask);

      setTaskName("");
      setTaskDetail("");
      setDueDate("");
      setDailyProgress("");
      setDayOfWeek([]);
      setOpenModal(false);

      reloadData();
    } catch (error) {
      console.error("Echec de la création de la tâche :", error);
    }
  };

  return (
    <>
      <Button
        color="none"
        onClick={() => setOpenModal(true)}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Ajouter un tâche
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="!bg-slate-300 !border-gray-400">
          <span className="!text-black dark:!text-black text-xl font-medium">
            Ajouter une nouvelle tâche
          </span>
        </ModalHeader>
        <ModalBody className="!bg-slate-300 !text-black">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <p className="text-base font-medium mb-1">Nom de la tâche</p>
              <TextInput
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                color="light"
                className=" !bg-white rounded-lg"
                required
              />
            </div>

            <div>
              <p className="text-base font-medium mb-1">Description</p>
              <Textarea
                id="taskDetail"
                value={taskDetail}
                onChange={(e) => setTaskDetail(e.target.value)}
                color="light"
                className=" !bg-white rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <p className="text-base font-medium mb-1">Date limite</p>
              <TextInput
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                color="light"
                className=" !bg-white rounded-lg"
                required
              />
            </div>

            <div>
              <p className="text-base font-medium mb-1">
                Progression base quotidienne (1-100)%
              </p>
              <TextInput
                id="dailyProgress"
                type="number"
                min="0"
                max="100"
                value={dailyProgress}
                onChange={(e) => setDailyProgress(e.target.value)}
                color="light"
                className=" !bg-white rounded-lg"
                required
              />
            </div>

            <div>
              <p className="text-base font-medium mb-1">
                Jours de la semaine (sélection multiple)
              </p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {weekDays.map((day) => (
                  <div key={day.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={day.value.toString()}
                      checked={dayOfWeek.includes(day.value)}
                      onChange={() => handleCheckboxChange(day.value)}
                      className=" w-4 h-4"
                    />
                    <Label
                      htmlFor={day.value.toString()}
                      className="!text-black dark:!text-black "
                    >
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="!bg-slate-300 flex justify-end border-t-0">
          <Button color="blue" onClick={handleSubmit}>
            Créer
          </Button>

          <Button
            type="button"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
