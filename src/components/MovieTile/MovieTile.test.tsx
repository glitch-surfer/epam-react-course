import { render, screen } from "@testing-library/react";
import { MovieTile } from "./MovieTile";
import { userEvent } from "@storybook/test";

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

describe("MovieTile", () => {
  it("renders movie information correctly", () => {
    render(<MovieTile movie={mockMovie} />);

    expect(screen.getByText("La La Land")).toBeInTheDocument();
    expect(screen.getByText("2016-12-29")).toBeInTheDocument();
    expect(screen.getByAltText("La La Land")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
    );
  });

  it("calls onClick callback when clicked", async () => {
    const handleClick = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={handleClick} />);

    await userEvent.click(screen.getByText("La La Land"));
    expect(handleClick).toHaveBeenCalledWith(mockMovie);
  });

  it("shows context menu when menu button is clicked", async () => {
    render(<MovieTile movie={mockMovie} />);

    await userEvent.click(screen.getByText("⋮"));
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onEdit callback when Edit is clicked", async () => {
    const handleEdit = jest.fn();
    render(<MovieTile movie={mockMovie} onEdit={handleEdit} />);

    await userEvent.click(screen.getByText("⋮"));
    await userEvent.click(screen.getByText("Edit"));

    expect(handleEdit).toHaveBeenCalledWith(mockMovie);
  });

  it("calls onDelete callback when Delete is clicked", async () => {
    const handleDelete = jest.fn();
    render(<MovieTile movie={mockMovie} onDelete={handleDelete} />);

    await userEvent.click(screen.getByText("⋮"));
    await userEvent.click(screen.getByText("Delete"));

    expect(handleDelete).toHaveBeenCalledWith(mockMovie);
  });
});
