"use client";

import { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filterType, setFilterType] = useState("All");
  const [sortType, setSortType] = useState("dueAsc");
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        filterType,
        setFilterType,
        sortType,
        setSortType,
        selectedTags,
        setSelectedTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
