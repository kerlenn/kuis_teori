'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Movie, MovieFormData } from '@/types/movie';
import { use } from 'react';

export default function EditMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    rating: 5,
    status: 'unwatched',
    review: '',
    type: 'another',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (response.ok) {
          const movie: Movie = await response.json();
          setFormData({
            title: movie.title,
            genre: movie.genre,
            releaseYear: movie.releaseYear,
            rating: movie.rating,
            status: movie.status as 'watched' | 'unwatched' | 'watching',
            review: movie.review,
            type: movie.type as 'chinese' | 'korean' | 'japanese' | 'another',
          });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/movies/${id}`);
      } else {
        alert('Gagal mengupdate movie!');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Terjadi kesalahan!');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'releaseYear' || name === 'rating' ? Number(value) : value,
    }));
  };

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="mb-4">
            <Link href={`/movies/${id}`} className="btn btn-outline-secondary">
              ← KEMBALI
            </Link>
          </div>

          <div className="card shadow">
            <div className="card-header bg-warning">
              <h3 className="mb-0">✏️ EDIT MOVIE</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Judul</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipe</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="chinese">Chinese</option>
                    <option value="korean">Korean</option>
                    <option value="japanese">Japanese</option>
                    <option value="another">Another</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Drama, Family, Horror, etc"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tahun Rilis</label>
                  <input
                    type="number"
                    className="form-control"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="unwatched">Belum Ditonton</option>
                    <option value="watching">Sedang Ditonton</option>
                    <option value="watched">Sudah Ditonton</option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-warning flex-grow-1">
                    💾 SIMPAN PERUBAHAN
                  </button>
                  <Link
                    href={`/movies/${id}`}
                    className="btn btn-outline-secondary"
                  >
                    BATAL
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}