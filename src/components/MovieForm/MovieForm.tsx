import React from "react";
import { useForm } from "react-hook-form";
import { Movie } from "../../models/movie.interface.ts";

interface MovieFormProps {
  initialData?: Partial<Movie>;
  onSubmit: (data: Movie) => void;
}

const GENRES = ["Crime", "Documentary", "Horror", "Comedy", "Action", "Drama"];

export const MovieForm: React.FC<MovieFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: initialData?.title ?? "",
      release_date: initialData?.release_date ?? "",
      poster_path: initialData?.poster_path ?? "",
      vote_average: initialData?.vote_average ?? "",
      genres: initialData?.genres ?? [],
      runtime: initialData?.runtime ?? "",
      overview: initialData?.overview ?? "",
    },
  });

  const onSubmitHandler = (data: any) => {
    const transformedData: Movie = {
      ...data,
      genres: Array.isArray(data.genres) ? data.genres : [data.genres],
      runtime: data.runtime ? Number(data.runtime) : 0,
      vote_average: data.vote_average ? Number(data.vote_average) : 0,
    };
    onSubmit(transformedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
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
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className={`w-full bg-[#323232] border ${
              errors.title ? "border-red-500" : "border-[#424242]"
            } rounded text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#F65261]`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="release_date"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Release Date
          </label>
          <input
            type="date"
            id="release_date"
            {...register("release_date", {
              required: "Release date is required",
            })}
            className={`w-full bg-[#323232] border ${
              errors.release_date ? "border-red-500" : "border-[#424242]"
            } rounded text-white px-4 py-3 focus:outline-none focus:border-[#F65261]`}
          />
          {errors.release_date && (
            <p className="text-red-500 text-sm">
              {errors.release_date.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="poster_path"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Movie URL
          </label>
          <input
            type="url"
            id="poster_path"
            placeholder="https://"
            {...register("poster_path", {
              required: "Movie URL is required",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: "Invalid URL format",
              },
            })}
            className={`w-full bg-[#323232] border ${
              errors.poster_path ? "border-red-500" : "border-[#424242]"
            } rounded text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#F65261]`}
          />
          {errors.poster_path && (
            <p className="text-red-500 text-sm">{errors.poster_path.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="vote_average"
            className="block text-[#F65261] uppercase text-xs font-medium mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            id="vote_average"
            placeholder="7.8"
            min="0"
            max="10"
            step="0.1"
            {...register("vote_average", {
              required: "Rating is required",
              min: { value: 0, message: "Rating must be at least 0" },
              max: { value: 10, message: "Rating cannot exceed 10" },
            })}
            className={`w-full bg-[#323232] border ${
              errors.vote_average ? "border-red-500" : "border-[#424242]"
            } rounded text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#F65261]`}
          />
          {errors.vote_average && (
            <p className="text-red-500 text-sm">
              {errors.vote_average.message}
            </p>
          )}
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
                    value={genre}
                    {...register("genres")}
                    className="rounded border-[#424242] bg-[#323232] text-[#F65261] focus:ring-[#F65261]"
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
            type="number"
            id="runtime"
            placeholder="minutes"
            {...register("runtime", {
              required: "Runtime is required",
              min: { value: 0, message: "Runtime must be at least 0" },
            })}
            className={`w-full bg-[#323232] border ${
              errors.runtime ? "border-red-500" : "border-[#424242]"
            } rounded text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#F65261]`}
          />
          {errors.runtime && (
            <p className="text-red-500 text-sm">{errors.runtime.message}</p>
          )}
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
          rows={4}
          {...register("overview", { required: "Overview is required" })}
          className={`w-full bg-[#323232] border ${
            errors.overview ? "border-red-500" : "border-[#424242]"
          } rounded text-white px-4 py-3 focus:outline-none focus:border-[#F65261]`}
        />
        {errors.overview && (
          <p className="text-red-500 text-sm">{errors.overview.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-8 py-3 rounded border border-[#F65261] text-[#F65261] hover:bg-[#F65261] hover:bg-opacity-10 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-8 py-3 rounded bg-[#F65261] text-white hover:bg-[#F65261]/90 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
