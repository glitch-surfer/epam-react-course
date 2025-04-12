import { render, screen } from "@testing-library/react";
import { MovieDetails } from "./MovieDetails";
import { userEvent } from "@storybook/test";

const mockMovie = {
  id: "1",
  imageUrl: "https://example.com/movie.jpg",
  name: "Test Movie",
  releaseYear: 2023,
  rating: 8.5,
  duration: "2h 15min",
  description: "Test movie description",
  genres: ["Action", "Adventure"],
};

describe("MovieDetails", () => {
  it("renders movie information correctly", () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("8.5/10")).toBeInTheDocument();
    expect(screen.getByText("2h 15min")).toBeInTheDocument();
    expect(screen.getByText("Test movie description")).toBeInTheDocument();
    expect(screen.getByText("Action, Adventure")).toBeInTheDocument();

    const image = screen.getByAltText("Test Movie");
    expect(image).toHaveAttribute("src", "https://example.com/movie.jpg");
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = jest.fn();
    render(<MovieDetails movie={mockMovie} onClose={handleClose} />);

    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not render close button when onClose is not provided", () => {
    render(<MovieDetails movie={mockMovie} />);

    const closeButton = screen.queryByRole("button");
    expect(closeButton).not.toBeInTheDocument();
  });

  it("renders genres when provided", () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByText(mockMovie.genres.join(", "))).toBeInTheDocument();
  });
});
