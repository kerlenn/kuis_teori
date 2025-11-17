import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg text-center p-5">
            <div className="card-body">
              <div className="mb-4">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <h2 className="mb-3">Halaman Tidak Ditemukan</h2>
                <p className="text-muted mb-4">
                  Maaf, halaman yang kamu cari tidak dapat ditemukan. 
                  Mungkin halaman tersebut telah dipindahkan atau dihapus.
                </p>
              </div>
              
              <div className="d-grid gap-2 col-8 mx-auto">
                <Link href="/" className="btn btn-primary btn-lg">
                  🏠 Kembali ke Home
                </Link>
                <Link href="/movies" className="btn btn-outline-primary btn-lg">
                  🎬 Lihat Movie List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}