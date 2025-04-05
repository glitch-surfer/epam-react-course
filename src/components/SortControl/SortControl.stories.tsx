import type { Meta, StoryObj } from "@storybook/react";
import { SortControl, SortOption } from "./SortControl";
import { useState } from "react";

const meta: Meta<typeof SortControl> = {
  title: "Components/SortControl",
  component: SortControl,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-black p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SortControl>;

export const Default: Story = {
  args: {
    currentSort: "release_date",
    onSortChange: (newSort) => console.log("Sort changed to:", newSort),
  },
};

export const Interactive = () => {
  const [currentSort, setCurrentSort] = useState<SortOption>("release_date");

  return (
    <SortControl currentSort={currentSort} onSortChange={setCurrentSort} />
  );
};
