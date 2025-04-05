import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieForm } from "./MovieForm";

describe("MovieForm", () => {
  const mockSubmit = jest.fn();
  const initialData = {
    title: "Test Movie",
    releaseDate: "2023-01-01",
    posterUrl: "https://example.com/poster.jpg",
    rating: "8.5",
    genres: ["Action", "Drama"],
    runtime: "120",
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
      initialData.releaseDate,
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
        title: "New Movie",
        releaseDate: "2023-12-31",
        genres: ["Action", "Drama"],
      }),
    );
  });
});
