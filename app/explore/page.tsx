'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export default function ExplorePage() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      // Menggunakan TMDB API (Free, tanpa API key untuk demo)
      // Atau gunakan API key kamu sendiri dari https://www.themoviedb.org/settings/api
      const API_KEY = 'YOUR_TMDB_API_KEY'; // Ganti dengan API key kamu
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies(data.results.slice(0, 12)); // Ambil 12 film teratas
    } catch (err) {
      setError('Gagal memuat data. Pastikan API key sudah benar!');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Memuat film populer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            Silakan daftar dan dapatkan API key gratis di:{' '}
            <a
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noopener noreferrer"
              className="alert-link"
            >
              TMDB API
            </a>
          </p>
        </div>
        <Link href="/movies" className="btn btn-primary">
          ← Kembali ke Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>🌟 Explore Popular Movies</h1>
          <p className="text-muted">Discover trending movies from TMDB API</p>
        </div>
        <Link href="/movies" className="btn btn-primary">
          ← My Movies
        </Link>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="bg-secondary d-flex align-items-center justify-content-center"
                  style={{ height: '400px' }}
                >
                  <span className="text-white">No Image</span>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted small">
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 100)}...`
                    : movie.overview}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : 'N/A'}
                  </small>
                  <span className="badge bg-warning text-dark">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}