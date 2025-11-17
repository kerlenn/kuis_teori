import Link from 'next/link';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
}

export default function MovieCard({ movie, onDelete }: MovieCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`Hapus "${movie.title}" dari list?`)) {
      onDelete(movie.id);
    }
  };

  const statusBadge = {
    watched: { text: 'Sudah Ditonton', class: 'bg-success' },
    watching: { text: 'Sedang Ditonton', class: 'bg-warning text-dark' },
    unwatched: { text: 'Belum Ditonton', class: 'bg-secondary' }
  };

  // Function untuk mendapatkan tipe badge
  const getTypeBadge = (type: Movie['type']) => {
    const badges = {
      chinese: { text: '🇨🇳 Chinese', class: 'bg-danger' },
      korean: { text: '🇰🇷 Korean', class: 'bg-primary' },
      japanese: { text: '🇯🇵 Japanese', class: 'bg-danger' },
      another: { text: '🌍 Another', class: 'bg-secondary' }
    };
    return badges[type] || badges.another;
  };

  const status = statusBadge[movie.status];
  const type = getTypeBadge(movie.type);

  return (
    <div className="col-md-6 mb-4">
      <Link href={`/movies/${movie.id}`} className="text-decoration-none">
        <div className="card movie-card position-relative">
          <button 
            className="btn btn-danger btn-sm btn-delete"
            onClick={handleDelete}
          >
            ✕
          </button>
          
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0">{movie.title}</h5>
            </div>
            
            <div className="mb-2">
              <span className={`badge ${status.class} me-2`}>
                {status.text}
              </span>
              <span className={`badge ${type.class} text-white`}>
                {type.text}
              </span>
            </div>

            <p className="text-muted mb-0">
              <small>{movie.genre} • {movie.releaseYear}</small>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}