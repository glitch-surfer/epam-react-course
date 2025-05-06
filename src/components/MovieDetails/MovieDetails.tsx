import React, { useEffect, useState } from "react";
import { Image } from "../shared/Image.tsx";
import { Genres } from "../shared/Genres.tsx";
import { Movie } from "../../models/movie.interface.ts";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState(useLoaderData<{ movie: Movie }>().movie);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.movie) setMovie(location.state.movie as Movie);
  }, [location]);

  const onClose = () => navigate(`/?${searchParams.toString()}`);

  return (
    <div className="flex flex-col md:flex-row bg-[#232323] text-white min-h-[500px]">
      {/* Left side - Image */}
      <Outlet context={{ initialData: movie }} />
      <div className="md:w-1/3 lg:w-1/4">
        <div className="relative aspect-[2/3] w-full">
          <Image src={movie.poster_path} alt={movie.title} />
        </div>
      </div>

      {/* Right side - Details */}
      <div className="flex-1 p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="space-y-4">
          {/* Title and Year */}
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <span className="text-lg border border-white rounded px-3 py-1">
              {movie.release_date}
            </span>
          </div>

          <div className="flex items-center justify-between space-x-6 text-gray-300">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{movie.vote_average}/10</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{movie.runtime}</span>
            </div>
          </div>

          {movie.genres.length && <Genres genres={movie.genres} />}

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
