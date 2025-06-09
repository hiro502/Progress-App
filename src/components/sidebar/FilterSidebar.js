"use client";
import { useFilter } from "@/contexte/FilterContext";
import { usePathname } from "next/navigation";

const FILTERS = [
  { label: "Tout", value: "all" },
  { label: "Terminé", value: "completed" },
  { label: "Incomplet", value: "incomplete" },
];

const SORT_OPTIONS = [
  { label: "Date limite (Croissant)", value: "dueAsc" },
  { label: "Date limite (Décroissant)", value: "dueDesc" },
  { label: "Progression (Croissant)", value: "progressAsc" },
  { label: "Progression (Décroissant)", value: "progressDesc" },
];

const TAG_COLORS = [
  { color: "bg-gray-500", label: "gray" },
  { color: "bg-red-500", label: "red" },
  { color: "bg-green-500", label: "green" },
  { color: "bg-blue-500", label: "blue" },
  { color: "bg-yellow-200", label: "yellow" },
  { color: "bg-purple-500", label: "purple" },
];

export default function FilterSidebar() {
  const pathname = usePathname();
  const {
    filterType,
    setFilterType,
    sortType,
    setSortType,
    selectedTags,
    setSelectedTags,
  } = useFilter();

  const handleTagToggle = (label) => {
    if (selectedTags.includes(label)) {
      setSelectedTags(selectedTags.filter((c) => c !== label));
    } else {
      setSelectedTags([...selectedTags, label]);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Filter */}
      <div>
        <h3 className="font-bold mb-2">Statut</h3>
        <div className="space-y-1">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterType(filter.value)}
              className={`block w-full text-left px-3 py-1 rounded ${
                filterType === filter.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort options */}
      <div>
        <h3 className="font-bold mb-2">Trier par</h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSortType(value)}
              className={`block w-full text-left px-3 py-1 rounded ${
                sortType === value ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Par tag color */}
      {pathname === "/projects" && (
        <div>
          <h3 className="font-bold mb-2">Couleur d&apos;étiquette</h3>
          <div className="flex flex-wrap gap-2">
            {TAG_COLORS.map(({ color, label }) => {
              const isSelected = selectedTags.includes(label);
              return (
                <button
                  key={color}
                  onClick={() => handleTagToggle(label)}
                  className={`w-6 h-6 rounded-full border-3 ${
                    isSelected
                      ? `border-black ${color}`
                      : `border-gray-300 ${color}`
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
