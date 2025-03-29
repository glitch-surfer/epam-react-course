import { render, screen } from "@testing-library/react";
import { SortControl } from "./SortControl";
import userEvent from "@testing-library/user-event";

describe("SortControl", () => {
  it("renders with default release date option", () => {
    const handleSort = jest.fn();
    render(
      <SortControl currentSort="release_date" onSortChange={handleSort} />,
    );

    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("release_date");
  });

  it("renders with title option when selected", () => {
    const handleSort = jest.fn();
    render(<SortControl currentSort="title" onSortChange={handleSort} />);

    expect(screen.getByRole("combobox")).toHaveValue("title");
  });

  it("calls onSortChange when selection changes", async () => {
    const handleSort = jest.fn();
    render(
      <SortControl currentSort="release_date" onSortChange={handleSort} />,
    );

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "title");

    expect(handleSort).toHaveBeenCalledWith("title");
  });

  it("contains both sort options", () => {
    const handleSort = jest.fn();
    render(
      <SortControl currentSort="release_date" onSortChange={handleSort} />,
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue("release_date");
    expect(options[1]).toHaveValue("title");
  });

  it("applies custom className when provided", () => {
    const handleSort = jest.fn();
    render(
      <SortControl
        currentSort="release_date"
        onSortChange={handleSort}
      />,
    );

    expect(screen.getByRole("combobox").parentElement).toHaveClass(
      "custom-class",
    );
  });
});
