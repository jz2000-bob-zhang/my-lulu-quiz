import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

export async function POST() {
  try {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
      return NextResponse.json(
        { message: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const db = createPool({ connectionString });

    // Delete all records
    const result = await db.sql`
      DELETE FROM quiz_responses
    `;

    return NextResponse.json({
      message: 'All quiz data deleted successfully!',
      deletedCount: result.rowCount,
    });

  } catch (error) {
    console.error('Error deleting quiz data:', error);
    return NextResponse.json(
      { message: 'Failed to delete quiz data.', error: String(error) },
      { status: 500 }
    );
  }
}
