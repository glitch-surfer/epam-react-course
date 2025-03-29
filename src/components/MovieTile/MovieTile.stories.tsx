// components/MovieTile/MovieTile.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MovieTile } from "./MovieTile";

const meta: Meta<typeof MovieTile> = {
  title: "Components/MovieTile",
  component: MovieTile,
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
type Story = StoryObj<typeof MovieTile>;

const sampleMovie = {
  id: "1",
  imageUrl: "https://example.com/pulp-fiction.jpg",
  name: "Pulp Fiction",
  releaseYear: 1994,
  genres: ["Crime", "Drama"],
};

export const Default: Story = {
  args: {
    movie: sampleMovie,
  },
};

export const WithCallbacks: Story = {
  args: {
    movie: sampleMovie,
    onClick: (movie) => console.log("Clicked:", movie),
    onEdit: (movie) => console.log("Edit:", movie),
    onDelete: (movie) => console.log("Delete:", movie),
  },
};
