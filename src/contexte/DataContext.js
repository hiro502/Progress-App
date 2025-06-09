"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchProjectsAndTasks } from "@/lib/fecthProjectsAndTasks";
import { auth } from "@/lib/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { projects, tasks } = await fetchProjectsAndTasks(user.uid);
      setProjects(projects);
      setTasks(tasks);
    };

    fetchData();
  }, [user]);

  const reloadData = async () => {
    if (!user) {
      setProjects([]);
      setTasks([]);
      setTodaysTasks([]);
      return;
    }
    const { projects, tasks } = await fetchProjectsAndTasks(user.uid);
    setProjects(projects);
    setTasks(tasks);
  };
  return (
    <DataContext.Provider
      value={{
        user,
        loading,
        projects,
        setProjects,
        tasks,
        setTasks,
        todaysTasks,
        setTodaysTasks,
        reloadData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
