import type { Meta, StoryObj } from "@storybook/react";
import { MovieDetails } from "./MovieDetails";

const meta: Meta<typeof MovieDetails> = {
  title: "Components/MovieDetails",
  component: MovieDetails,
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
type Story = StoryObj<typeof MovieDetails>;

const sampleMovie = {
  id: "1",
  imageUrl: "https://example.com/pulp-fiction.jpg",
  name: "Pulp Fiction",
  releaseYear: 1994,
  rating: 8.9,
  duration: "2h 34min",
  description:
    "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  genres: ["Crime", "Drama"],
};

export const Default: Story = {
  args: {
    movie: sampleMovie,
  },
};

export const WithCloseButton: Story = {
  args: {
    movie: sampleMovie,
    onClose: () => console.log("Close clicked"),
  },
};
