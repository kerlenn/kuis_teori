import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body text-center p-5">
              <h1 className="display-4 mb-4">🤍 Kerlen's Movie List 🤍</h1>

              <p className="lead mb-4">
                Website untuk mencatat Movie List Kerlen
              </p>

              <div className="d-grid gap-2 col-6 mx-auto">
                <Link href="/movies" className="btn btn-primary btn-lg">
                  My Movies' Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}