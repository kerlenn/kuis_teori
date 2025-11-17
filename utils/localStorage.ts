import { Movie } from '@/types/movie';

const STORAGE_KEY = 'movies';

export const getMovies = (): Movie[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveMovies = (movies: Movie[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addMovie = (movie: Omit<Movie, 'id' | 'createdAt'>): Movie => {
  const movies = getMovies();
  const newMovie: Movie = {
    ...movie,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  movies.push(newMovie);
  saveMovies(movies);
  return newMovie;
};

export const deleteMovie = (id: string): void => {
  const movies = getMovies();
  const filtered = movies.filter(movie => movie.id !== id);
  saveMovies(filtered);
};

export const getMovieById = (id: string): Movie | undefined => {
  const movies = getMovies();
  return movies.find(movie => movie.id === id);
};