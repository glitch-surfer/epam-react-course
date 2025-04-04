// SearchForm.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { SearchForm } from "./SearchForm";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof SearchForm> = {
  title: "Forms/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1a1a" }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Empty: Story = {
  args: {
    initialQuery: "",
    onSearch: action("onSearch"),
  },
};

export const WithInitialQuery: Story = {
  args: {
    initialQuery: "Matrix",
    onSearch: action("onSearch"),
  },
};

export const LongInitialQuery: Story = {
  args: {
    initialQuery: "The Lord of the Rings: The Fellowship of the Ring",
    onSearch: action("onSearch"),
  },
};

export const Interactive: Story = {
  args: {
    initialQuery: "",
    onSearch: action("onSearch"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("What do you want to watch?");
    const searchButton = canvas.getByText("SEARCH");

    // Simulate user typing
    await userEvent.type(input, "Star Wars");
    // Simulate clicking the search button
    await userEvent.click(searchButton);
  },
};

// Example of how to test different states
export const WithPlayground: Story = {
  args: {
    initialQuery: "Edit this text",
    onSearch: action("onSearch"),
  },
  parameters: {
    controls: {
      include: ["initialQuery", "onSearch"],
    },
  },
};
