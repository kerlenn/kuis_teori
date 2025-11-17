'use client';

import { useState } from 'react';
import { MovieFormData } from '@/types/movie';

interface MovieFormProps {
  onSubmit: (data: MovieFormData) => void;
}

export default function MovieForm({ onSubmit }: MovieFormProps) {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    rating: 5,
    status: 'unwatched',
    review: '',
    type: 'another',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      genre: '',
      releaseYear: new Date().getFullYear(),
      rating: 5,
      status: 'unwatched',
      review: '',
      type: 'another',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'releaseYear' ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 h-100">
      <h4 className="mb-3">TAMBAH MOVIE LIST BARU</h4>
      
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

      <button type="submit" className="btn btn-primary w-100 mt-auto">
        TAMBAH KE LIST
      </button>
    </form>
  );
}