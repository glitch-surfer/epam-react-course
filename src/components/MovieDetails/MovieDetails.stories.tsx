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
  title: "La La Land",
  tagline: "Here's to the fools who dream.",
  vote_average: 7.9,
  vote_count: 6782,
  release_date: "2016-12-29",
  poster_path:
      "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
  overview:
      "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
  budget: 30000000,
  revenue: 445435700,
  runtime: 128,
  genres: ["Comedy", "Drama", "Romance"],
  id: 313369,
}

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
