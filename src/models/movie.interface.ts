export interface Movie {
  id: string;
  imageUrl: string;
  name: string;
  releaseYear: number;
  genres?: string[];
}

export interface MovieDetailsData extends Movie {
  rating: number;
  duration: number | string;
  description: string;
}
