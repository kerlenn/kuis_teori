export interface Movie {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  rating: number;
  status: 'watched' | 'unwatched' | 'watching';
  review: string;
  type: 'chinese' | 'korean' | 'japanese' | 'another';
  createdAt: string;
}

export type MovieFormData = Omit<Movie, 'id' | 'createdAt'>;