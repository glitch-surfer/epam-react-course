import React, { useState } from "react";
import { Image } from "../shared/Image.tsx";
import { Genres } from "../shared/Genres.tsx";
import { Movie } from "../../models/movie.interface.ts";

interface MovieTileProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
}

export const MovieTile: React.FC<MovieTileProps> = ({
  movie,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    onClick?.(movie);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(movie);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(movie);
    setShowMenu(false);
  };

  return (
    <div
      className="group relative w-[300px] bg-[#232323] cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full aspect-[2/3]">
        <Image src={movie.imageUrl} alt={movie.name} />
        <div className="absolute top-0 right-0 p-2">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-white text-2xl font-bold hover:opacity-80"
            onClick={handleMenuClick}
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute top-10 right-2 rounded-md shadow-lg z-10 min-w-[120px] py-1">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 text-white">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-normal m-0">{movie.name}</h3>
          <span className="text-sm border border-white rounded px-2.5 py-1">
            {movie.releaseYear}
          </span>
        </div>
        <Genres genres={movie.genres ?? []} />
      </div>
    </div>
  );
};
