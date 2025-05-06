import React, { useEffect, useState } from "react";
import { MovieForm } from "../MovieForm/MovieForm";
import { Dialog } from "../shared/Dialog/Dialog.tsx";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { Movie } from "../../models/movie.interface.ts";

interface MovieDialogContext {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Movie) => void;
  initialData?: Partial<Movie>;
}

export const AddMovieDialog: React.FC = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => setIsLoading(false), []);

  const onClose = (newMovieId = "") =>
    navigate(`/${newMovieId}?${searchParams.toString()}`);

  const onSubmit = async (data: Movie) => {
    try {
      setIsLoading(true);

      const resp = await fetch(`http://localhost:4000/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        await onClose(((await resp.json()) as Movie).id.toString());
      } else setError(await resp.text());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog isOpen={true} onClose={onClose} title="Add Movie">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <MovieForm onSubmit={onSubmit} />
      )}
    </Dialog>
  );
};

export const EditMovieDialog: React.FC = () => {
  const { initialData } =
    useOutletContext<Pick<MovieDialogContext, "initialData">>();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => setIsLoading(false), []);

  const onClose = (newMovie: Movie) =>
    navigate(`/${newMovie.id.toString()}?${searchParams.toString()}`, {
      state: { movie: newMovie },
    });

  const onSubmit = async (data: Movie) => {
    try {
      setIsLoading(true);

      const resp = await fetch(`http://localhost:4000/movies`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        const movie = (await resp.json()) as Movie;
        await onClose(movie);
      } else setError(await resp.text());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={true}
      onClose={() => onClose(initialData as Movie)}
      title="Edit Movie"
    >
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <MovieForm initialData={initialData} onSubmit={onSubmit} />
      )}
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
