import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieForm } from "./MovieForm";

describe("MovieForm", () => {
  const mockSubmit = jest.fn();
  const initialData = {
    title: "Test Movie",
    release_date: "2023-01-01",
    poster_path: "https://example.com/poster.jpg",
    vote_average: 8.5,
    genres: ["Action", "Drama"],
    runtime: 120,
    overview: "Test overview",
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("renders empty form when no initial data provided", () => {
    render(<MovieForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/release date/i)).toHaveValue("");
  });

  it("renders form with initial data", () => {
    render(<MovieForm onSubmit={mockSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue(initialData.title);
    expect(screen.getByLabelText(/release date/i)).toHaveValue(
      initialData.release_date,
    );
  });

  it("submits form data correctly", async () => {
    render(<MovieForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText(/title/i), "New Movie");
    await userEvent.type(screen.getByLabelText(/release date/i), "2023-12-31");
    await userEvent.type(
      screen.getByLabelText(/Movie URL/i),
      "https://example.com/new.jpg",
    );
    await userEvent.type(screen.getByLabelText(/rating/i), "9.0");
    await userEvent.type(screen.getByLabelText(/runtime/i), "150");
    await userEvent.type(screen.getByLabelText(/overview/i), "New overview");

    await userEvent.click(screen.getByLabelText("Action"));
    await userEvent.click(screen.getByLabelText("Drama"));

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        genres: ["Action", "Drama"],
        overview: "New overview",
        poster_path: "https://example.com/new.jpg",
        release_date: "2023-12-31",
        runtime: 150,
        title: "New Movie",
        vote_average: 9,
      }),
    );
  });
});
