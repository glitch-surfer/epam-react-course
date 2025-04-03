import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchForm } from "../SearchForm";
import { userEvent } from "@testing-library/user-event";

describe("SearchForm Component", () => {
  test("renders input with initial value from props", () => {
    const initialQuery = "initial search";
    render(<SearchForm initialQuery={initialQuery} onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(
      "What do you want to watch?",
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(initialQuery);
  });

  test("calls onSearch with input value when Submit button is clicked", async () => {
    const mockOnSearch = jest.fn();
    const testQuery = "test search";

    render(<SearchForm onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(
      "What do you want to watch?",
    );
    const submitButton = screen.getByText("SEARCH");

    await userEvent.type(inputElement, testQuery);

    await userEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith(testQuery);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  test("updates input value when typing", async () => {
    render(<SearchForm onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(
      "What do you want to watch?",
    ) as HTMLInputElement;
    const testValue = "test input";

    await userEvent.type(inputElement, testValue);

    expect(inputElement.value).toBe(testValue);
  });
});
