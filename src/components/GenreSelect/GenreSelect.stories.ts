import type { Meta, StoryObj } from "@storybook/react";
import { GenreSelect } from "./GenreSelect";

const meta: Meta<typeof GenreSelect> = {
  title: "Navigation/GenreSelect",
  component: GenreSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1a1a" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GenreSelect>;

export const Default: Story = {
  args: {
    genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
    selectedGenre: "Action",
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};

export const ManyGenres: Story = {
  args: {
    genres: [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "Horror",
    ],
    selectedGenre: "Animation",
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};

export const SingleGenre: Story = {
  args: {
    genres: ["Action"],
    selectedGenre: "Action",
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};

export const NoGenres: Story = {
  args: {
    genres: [],
    selectedGenre: "",
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};

export const NoSelection: Story = {
  args: {
    genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
    selectedGenre: "",
    onSelect: (genre) => console.log(`Selected genre: ${genre}`),
  },
};
