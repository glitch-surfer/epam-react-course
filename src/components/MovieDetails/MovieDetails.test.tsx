import { render, screen } from "@testing-library/react";
import { MovieDetails } from "./MovieDetails";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import * as ReactRouter from "react-router-dom"; // Import React Router to mock hooks

jest.mock("react-router-dom", () => ({
  useLoaderData: jest.fn(),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockMovie = {
  title: "La La Land",
  tagline: "Here's to the fools who dream.",
  vote_average: 7.9,
  vote_count: 6782,
  release_date: "2016-12-29",
  poster_path:
    "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
  overview:
    "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
  budget: 30000000,
  revenue: 445435700,
  runtime: 128,
  genres: ["Comedy", "Drama", "Romance"],
  id: 313369,
};

describe("MovieDetails", () => {
  const mockUseLoaderData = ReactRouter.useLoaderData as jest.Mock;
  const mockUseSearchParams = ReactRouter.useSearchParams as jest.Mock;
  const mockUseNavigate = ReactRouter.useNavigate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoaderData.mockReturnValue({ movie: mockMovie });
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("?query=abc&sort=desc"),
    ]);
    mockUseNavigate.mockReturnValue(jest.fn());
  });

  it("renders movie information correctly", () => {
    render(<MovieDetails />);

    expect(screen.getByText("La La Land")).toBeInTheDocument();
    expect(screen.getByText("2016-12-29")).toBeInTheDocument();
    expect(screen.getByText("7.9/10")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();

    const image = screen.getByAltText("La La Land");
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
    );
  });

  it("navigates to root with preserved query parameters when close button is clicked", async () => {
    const mockNavigate = jest.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    render(<MovieDetails />);

    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/?query=abc&sort=desc");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("renders genres when provided", () => {
    render(<MovieDetails />);

    expect(screen.getByText(mockMovie.genres.join(", "))).toBeInTheDocument();
  });
});
