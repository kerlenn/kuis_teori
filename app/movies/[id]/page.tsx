'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { use } from 'react';

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params menggunakan React.use()
  const { id } = use(params);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          router.push('/movies');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        router.push('/movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, router]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const statusInfo = {
    watched: { text: 'Sudah Ditonton', class: 'success', icon: '✅' },
    watching: { text: 'Sedang Ditonton', class: 'warning', icon: '▶️' },
    unwatched: { text: 'Belum Ditonton', class: 'secondary', icon: '⏸️' },
  };

  const status = statusInfo[movie.status as keyof typeof statusInfo];

  // Type info
  let typeText = '🇨🇳 Chinese';
  let typeIcon = '🇨🇳';
  if (movie.type === 'korean') {
    typeText = '🇰🇷 Korean';
    typeIcon = '🇰🇷';
  } else if (movie.type === 'japanese') {
    typeText = '🇯🇵 Japanese';
    typeIcon = '🇯🇵';
  } else if (movie.type === 'another') {
    typeText = '🌍 Another';
    typeIcon = '🌍';
  }

  return (
    <div className="container">
      <div className="mb-4">
        <Link href="/movies" className="btn btn-outline-secondary">
          ← KEMBALI KE LIST
        </Link>
        <Link href={`/movies/edit/${movie.id}`} className="btn btn-warning ms-2">
          ✏️ EDIT
        </Link>
      </div>

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{movie.title}</h2>
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-8">
              <div className="mb-4">
                <h5 className="text-muted mb-3">Informasi</h5>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Tipe:</div>
                  <div className="col-sm-8">
                    <span className="badge bg-info text-white">{typeText}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Genre:</div>
                  <div className="col-sm-8">{movie.genre}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Tahun Rilis:</div>
                  <div className="col-sm-8">{movie.releaseYear}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Status:</div>
                  <div className="col-sm-8">
                    <span className={`badge bg-${status.class}`}>
                      {status.icon} {status.text}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">Ditambahkan:</div>
                  <div className="col-sm-8">
                    {new Date(movie.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <div className="display-1 mb-3">{typeIcon}</div>
                  <h4 className="mb-3">{movie.title}</h4>
                  <p className="text-muted mb-0">{movie.genre}</p>
                  <p className="text-muted mb-0">{movie.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}