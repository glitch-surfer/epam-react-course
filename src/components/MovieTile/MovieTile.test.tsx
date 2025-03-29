import { act, render, screen } from "@testing-library/react";
import { MovieTile } from "./MovieTile";
import { userEvent } from "@storybook/test";

const mockMovie = {
  id: "1",
  imageUrl: "https://example.com/movie.jpg",
  name: "Test Movie",
  releaseYear: 2023,
  genres: ["Action", "Adventure"],
};

describe("MovieTile", () => {
  it("renders movie information correctly", () => {
    render(<MovieTile movie={mockMovie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Action, Adventure")).toBeInTheDocument();
    expect(screen.getByAltText("Test Movie")).toHaveAttribute(
      "src",
      "https://example.com/movie.jpg",
    );
  });

  it("calls onClick callback when clicked", async () => {
    const handleClick = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={handleClick} />);

    await userEvent.click(screen.getByText("Test Movie"));
    expect(handleClick).toHaveBeenCalledWith(mockMovie);
  });

  it("shows context menu when menu button is clicked", async () => {
    render(<MovieTile movie={mockMovie} />);

    await act(async () => await userEvent.click(screen.getByText("⋮")));
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onEdit callback when Edit is clicked", async () => {
    const handleEdit = jest.fn();
    render(<MovieTile movie={mockMovie} onEdit={handleEdit} />);

    await act(async () => {
      await userEvent.click(screen.getByText("⋮"));
      await userEvent.click(screen.getByText("Edit"));
    });

    expect(handleEdit).toHaveBeenCalledWith(mockMovie);
  });

  it("calls onDelete callback when Delete is clicked", async () => {
    const handleDelete = jest.fn();
    render(<MovieTile movie={mockMovie} onDelete={handleDelete} />);

    await act(async () => {
      await userEvent.click(screen.getByText("⋮"));
      await userEvent.click(screen.getByText("Delete"));
    });
    expect(handleDelete).toHaveBeenCalledWith(mockMovie);
  });
});
