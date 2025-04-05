import React from "react";

export interface MovieFormData {
  title: string;
  releaseDate: string;
  movieUrl: string;
  rating: string;
  genres: string[];
  runtime: string;
  overview?: string;
}

interface MovieFormProps {
  initialData?: Partial<MovieFormData>;
  onSubmit: (data: MovieFormData) => void;
}

const GENRES = ["Crime", "Documentary", "Horror", "Comedy", "Action", "Drama"];

export const MovieForm: React.FC<MovieFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const genres = formData.getAll("genres") as string[];
    const data = {
      ...Object.fromEntries(formData),
      genres,
    } as MovieFormData;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title}
            placeholder="Title"
            required
            className="w-full bg-[#323232] border border-[#424242] rounded 
                       text-white px-4 py-3 placeholder-gray-500
                       focus:outline-none focus:border-[#F65261]"
          />
        </div>

        <div>
          <label
            htmlFor="releaseDate"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            defaultValue={initialData?.releaseDate}
            required
            className="w-full bg-[#323232] border border-[#424242] rounded 
                       text-white px-4 py-3
                       focus:outline-none focus:border-[#F65261]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="movieUrl"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Movie URL
          </label>
          <input
            type="url"
            id="movieUrl"
            name="movieUrl"
            defaultValue={initialData?.movieUrl}
            placeholder="https://"
            required
            className="w-full bg-[#323232] border border-[#424242] rounded 
                       text-white px-4 py-3 placeholder-gray-500
                       focus:outline-none focus:border-[#F65261]"
          />
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            placeholder="7.8"
            defaultValue={initialData?.rating}
            required
            className="w-full bg-[#323232] border border-[#424242] rounded 
                       text-white px-4 py-3 placeholder-gray-500
                       focus:outline-none focus:border-[#F65261]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-[#F65261] uppercase text-xs font-medium mb-2">
            Genre
          </label>
          <div className="bg-[#323232] border border-[#424242] rounded p-4">
            <div className="grid grid-cols-2 gap-2">
              {GENRES.map((genre) => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="genres"
                    value={genre}
                    defaultChecked={initialData?.genres?.includes(genre)}
                    className="rounded border-[#424242] bg-[#323232] 
                             text-[#F65261] focus:ring-[#F65261]"
                  />
                  <span className="text-white text-sm">{genre}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="runtime"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Runtime
          </label>
          <input
            type="text"
            id="runtime"
            name="runtime"
            placeholder="minutes"
            defaultValue={initialData?.runtime}
            required
            className="w-full bg-[#323232] border border-[#424242] rounded 
                       text-white px-4 py-3 placeholder-gray-500
                       focus:outline-none focus:border-[#F65261]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="overview"
          className="block text-[#F65261] uppercase text-xs font-medium mb-2"
        >
          Overview
        </label>
        <textarea
          id="overview"
          name="overview"
          rows={4}
          defaultValue={initialData?.overview}
          className="w-full bg-[#323232] border border-[#424242] rounded 
                       text-white px-4 py-3
                       focus:outline-none focus:border-[#F65261]"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="reset"
          className="px-8 py-3 rounded border border-[#F65261] text-[#F65261] 
                     hover:bg-[#F65261] hover:bg-opacity-10 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-8 py-3 rounded bg-[#F65261] text-white 
                     hover:bg-[#F65261]/90 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
