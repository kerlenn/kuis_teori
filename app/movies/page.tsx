'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import MovieForm from '@/components/MovieForm';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<'all' | 'watched' | 'unwatched' | 'watching'>('all');
  const [loading, setLoading] = useState(true);

  // Fetch movies dari API
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async (movieData: Omit<Movie, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setMovies(prev => [newMovie, ...prev]);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMovies(prev => prev.filter(movie => movie.id !== id));
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const filteredMovies = movies.filter(movie => {
    if (filter === 'all') return true;
    return movie.status === filter;
  });

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* KOLOM KIRI - FORM */}
        <div className="col-md-4">
          <h1 className="mb-4">MOVIE LIST KERLEN 😍</h1>
          <MovieForm onSubmit={handleAddMovie} />
        </div>

        {/* KOLOM KANAN - LIST */}
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>DAFTAR FILM ({filteredMovies.length})</h3>
            <div className="btn-group" role="group">
              <button
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                ALL
              </button>
              <button
                className={`btn btn-sm ${filter === 'watched' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setFilter('watched')}
              >
                DONE
              </button>
              <button
                className={`btn btn-sm ${filter === 'watching' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setFilter('watching')}
              >
                WATCHING..
              </button>
              <button
                className={`btn btn-sm ${filter === 'unwatched' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => setFilter('unwatched')}
              >
                WISH LIST
              </button>
            </div>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="alert alert-info text-center">
              <h5>MOVIE LIST MASIH KOSONG..</h5>
              <p className="mb-0">Tambahkan movie list kamu!</p>
            </div>
          ) : (
            <div className="row">
              {filteredMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDelete={handleDeleteMovie}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}