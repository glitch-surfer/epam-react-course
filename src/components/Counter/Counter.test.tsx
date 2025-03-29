import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { Counter } from "./Counter.tsx";

describe("Counter Component", () => {
  test("renders initial value provided in props", () => {
    const initialValue = 5;
    render(<Counter initialValue={initialValue} />);

    const countElement = screen.getByText(initialValue.toString());
    expect(countElement).toBeInTheDocument();
  });

  test("decrements the displayed value when decrement button is clicked", async () => {
    const initialValue = 5;
    render(<Counter initialValue={initialValue} />);

    const decrementButton = screen.getByText("-");
    await userEvent.click(decrementButton);

    const countElement = screen.getByText((initialValue - 1).toString());
    expect(countElement).toBeInTheDocument();
  });

  test("increments the displayed value when increment button is clicked", async () => {
    const initialValue = 5;
    render(<Counter initialValue={initialValue} />);

    const incrementButton = screen.getByText("+");
    await userEvent.click(incrementButton);

    const countElement = screen.getByText((initialValue + 1).toString());
    expect(countElement).toBeInTheDocument();
  });
});
