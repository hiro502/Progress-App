"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import { useData } from "@/contexte/DataContext";
const provider = new GoogleAuthProvider();

export function LoginButton() {
  const [openModal, setOpenModal] = useState(false);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Échec de l’authentification :", error);
      alert(
        "Échec de l’authentification : " +
          (error.message || "Une erreur est survenue.")
      );
    }
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Échec de l’authentification anonyme :", error);
      alert(
        "Échec de l’authentification anonyme : " +
          (error.message || "Une erreur est survenue.")
      );
    }
  };

  return (
    <>
      <Button
        color="none"
        onClick={() => setOpenModal(true)}
        className="bg-blue-500 text-white text-xl px-4 py-2 rounded hover:bg-blue-700"
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Log in
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="!bg-slate-300 !border-gray-400">
          <span className="!text-black dark:!text-black text-xl font-medium">
            Choisissez une méthode de connexion
          </span>
        </ModalHeader>
        <ModalBody className="!bg-slate-300 !text-black flex flex-col items-center gap-6 border-none shadow-none">
          <Button className="text-lg w-[60%]" onClick={loginAsGuest}>
            <img
              src="./default-icon.png"
              alt="Icône invité"
              className="w-5 h-5 mr-2"
            />
            Se connecter en tant qu’invité
          </Button>

          <Button className="text-lg w-[60%]" onClick={loginWithGoogle}>
            <img
              src="./google-logo.png"
              alt="Logo Google"
              className="w-5 h-5 mr-2 rounded-full"
            />
            Se connecter avec Google
          </Button>
        </ModalBody>
        <ModalFooter className="!bg-slate-300 flex justify-end !border-slate-300">
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

export function LogoutButton() {
  return (
    <button onClick={() => auth.signOut()} className="cursor-pointer">
      Log out
    </button>
  );
}
