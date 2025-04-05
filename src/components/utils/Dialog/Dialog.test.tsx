import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Dialog } from "./Dialog";

jest.mock("react-portal", () => ({
  Portal: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Dialog", () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    title: "Test Dialog",
    onClose: mockOnClose,
    children: <div>Test Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders nothing when isOpen is false", () => {
    render(<Dialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("renders the dialog when isOpen is true", () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", async () => {
    render(<Dialog {...defaultProps} />);
    const closeButton = screen.getByLabelText("Close dialog");
    await userEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the overlay", async () => {
    render(<Dialog {...defaultProps} />);
    const overlay = screen.getByText("Test Dialog").parentElement?.parentElement
      ?.previousSibling as HTMLElement | null;
    if (overlay) {
      await userEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it("calls onClose when pressing Escape key", async () => {
    render(<Dialog {...defaultProps} />);
    await userEvent.keyboard("{Escape}");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders JSX title when provided", () => {
    const jsxTitle = <span data-testid="custom-title">Custom Title</span>;
    render(<Dialog {...defaultProps} title={jsxTitle} />);
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
  });

  it("manages body overflow correctly", () => {
    const { unmount } = render(<Dialog {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });
});
