import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GenreSelect } from "./GenreSelect.tsx";
import { userEvent } from "@testing-library/user-event";

describe("GenreSelect Component", () => {
  const mockGenres = ["Action", "Comedy", "Drama", "Horror"];

  test("renders all genres passed in props", () => {
    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre="Action"
        onSelect={() => {}}
      />,
    );

    mockGenres.forEach((genre) => {
      const genreButton = screen.getByText(genre);
      expect(genreButton).toBeInTheDocument();
    });
  });

  test("highlights the selected genre", () => {
    const selectedGenre = "Comedy";
    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre={selectedGenre}
        onSelect={() => {}}
      />,
    );

    const selectedButton = screen.getByText(selectedGenre);
    expect(selectedButton).toHaveClass("font-bold");
    expect(selectedButton).not.toHaveClass("opacity-70");

    mockGenres
      .filter((genre) => genre !== selectedGenre)
      .forEach((genre) => {
        const button = screen.getByText(genre);
        expect(button).toHaveClass("opacity-70");
        expect(button).not.toHaveClass("font-bold");
      });
  });

  test("calls onSelect with correct genre when clicked", async () => {
    const mockOnSelect = jest.fn();
    const genreToClick = "Drama";

    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre="Action"
        onSelect={mockOnSelect}
      />,
    );

    const genreButton = screen.getByText(genreToClick);
    await userEvent.click(genreButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(genreToClick);
  });

  test("applies correct styling classes to buttons", () => {
    const selectedGenre = "Action";
    render(
      <GenreSelect
        genres={mockGenres}
        selectedGenre={selectedGenre}
        onSelect={() => {}}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(mockGenres.length);

    buttons.forEach((button) => {
      expect(button).toHaveClass("text-white", "text-xl", "uppercase");
    });
  });
});
