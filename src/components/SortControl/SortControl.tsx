import React from "react";

export type SortOption = "release_date" | "title";

interface SortControlProps {
  currentSort: SortOption;
  onSortChange: (newSort: SortOption) => void;
}

export const SortControl: React.FC<SortControlProps> = ({
  currentSort,
  onSortChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption);
  };

  return (
    <div className="flex items-center space-x-4 gap-4">
      <label htmlFor="sort-select" className="text-white text-base font-normal">
        Sort by
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleChange}
        className="bg-[#232323] text-white px-4 py-2 rounded appearance-none cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-white/20
                 bg-no-repeat bg-right pr-8"
      >
        <option value="release_date">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};
