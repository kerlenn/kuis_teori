import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - List all movies
export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

// POST - Create new movie
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, genre, releaseYear, rating, status, review, type } = body;

    const movie = await prisma.movie.create({
      data: {
        title,
        genre,
        releaseYear: parseInt(releaseYear),
        rating: parseInt(rating),
        status,
        review,
        type,
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}