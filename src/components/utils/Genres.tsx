import React from "react";

interface GenresProps {
  genres: string[];
}

export const Genres: React.FC<GenresProps> = ({ genres }) => {
  return <p className="text-sm text-gray-400 mt-2">{genres.join(", ")}</p>;
};
