import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  LoaderFunction,
  Params,
  RouterProvider,
} from "react-router-dom";
import { SearchForm } from "./components/SearchForm/SearchForm.tsx";
import { MovieDetails } from "./components/MovieDetails/MovieDetails.tsx";
import { Movie } from "./models/movie.interface.ts";
import {AddMovieDialog, EditMovieDialog} from "./components/MovieDialogs/MovieDialogs.tsx";

const movieLoader: LoaderFunction<{ params: Params }> = async ({ params }) => {
  const response = await fetch(
    `http://localhost:4000/movies/${params.movieId ?? ""}`,
  );
  const movie = (await response.json()) as Movie;

  return { movie };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SearchForm />,
        children: [
          {
            path: "/new",
            element: <AddMovieDialog />,
          }
        ]
      },
      {
        path: "/:movieId",
        element: <MovieDetails />,
        loader: movieLoader,
        children: [
          {
            path: "/:movieId/edit",
            element: <EditMovieDialog />,
          }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
