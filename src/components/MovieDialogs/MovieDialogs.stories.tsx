import type { Meta } from "@storybook/react";
import { useState } from "react";
import {
  AddMovieDialog,
  DeleteMovieDialog,
  EditMovieDialog,
} from "./MovieDialogs.tsx";

const meta: Meta = {
  title: "Composite/MovieDialogs",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const sampleMovie = {
  title: "Pulp Fiction",
  releaseDate: "1994-10-14",
  posterUrl: "https://example.com/pulp-fiction.jpg",
  rating: "8.9",
  genres: ["Crime", "Drama"],
  runtime: "154",
  overview:
    "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
};

export const AddMovie = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Add Movie
      </button>
      <AddMovieDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          console.log("Submitted:", data);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const EditMovie = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Edit Movie
      </button>
      <EditMovieDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={sampleMovie}
        onSubmit={(data) => {
          console.log("Submitted:", data);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const DeleteMovie = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Delete Movie
      </button>
      <DeleteMovieDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => {
          console.log("Delete confirmed");
          setIsOpen(false);
        }}
        movieTitle="Pulp Fiction"
      />
    </div>
  );
};
