import React from "react";
import { MovieForm, MovieFormData } from "../MovieForm/MovieForm";
import { Dialog } from "../shared/Dialog/Dialog.tsx";
import { useOutletContext } from "react-router-dom";

interface MovieDialogContext {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MovieFormData) => void;
  initialData?: Partial<MovieFormData>;
}

export const AddMovieDialog: React.FC = () => {
  const { isOpen, onClose, onSubmit } = useOutletContext<MovieDialogContext>();
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add Movie">
      <MovieForm onSubmit={onSubmit} />
    </Dialog>
  );
};

export const EditMovieDialog: React.FC = () => {
  const { isOpen, onClose, onSubmit, initialData } =
    useOutletContext<MovieDialogContext>();
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Movie">
      <MovieForm initialData={initialData} onSubmit={onSubmit} />
    </Dialog>
  );
};

interface DeleteMovieDialogContext extends MovieDialogContext {
  movieTitle: string;
  onSubmit: () => void;
}

const DeleteMovieDialogContent: React.FC<
  Omit<DeleteMovieDialogContext, "isOpen">
> = ({ movieTitle, onClose, onSubmit }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Are you sure you want to delete &#34;{movieTitle}&#34;?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export const DeleteMovieDialog: React.FC = () => {
  const { isOpen, onClose, onSubmit, movieTitle } =
    useOutletContext<DeleteMovieDialogContext>();
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Delete Movie">
      <DeleteMovieDialogContent
        movieTitle={movieTitle}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Dialog>
  );
};
