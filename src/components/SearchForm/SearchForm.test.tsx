import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchForm } from "./SearchForm.tsx";
import { userEvent } from "@testing-library/user-event";
import * as ReactRouter from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useOutletContext: jest.fn(),
  Outlet: () => null,
}));

describe("SearchForm Component", () => {
  const mockUseOutletContext = ReactRouter.useOutletContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with initial value from outlet context", () => {
    const initialQuery = "initial search";
    mockUseOutletContext.mockReturnValue({ initialQuery, onSearch: jest.fn() });

    render(<SearchForm />);

    const inputElement = screen.getByPlaceholderText(
        "What do you want to watch?",
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(initialQuery);
  });

  test("calls onSearch with input value when Submit button is clicked", async () => {
    const mockOnSearch = jest.fn();
    const testQuery = "test search";

    mockUseOutletContext.mockReturnValue({ initialQuery: "", onSearch: mockOnSearch });

    render(<SearchForm />);

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
    mockUseOutletContext.mockReturnValue({ initialQuery: "", onSearch: jest.fn() });

    render(<SearchForm />);

    const inputElement = screen.getByPlaceholderText(
        "What do you want to watch?",
    ) as HTMLInputElement;
    const testValue = "test input";

    await userEvent.type(inputElement, testValue);

    expect(inputElement.value).toBe(testValue);
  });
});