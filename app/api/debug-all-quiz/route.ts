import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

export async function GET() {
  try {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
      return NextResponse.json(
        { message: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const db = createPool({ connectionString });

    // Get ALL records
    const result = await db.sql`
      SELECT * FROM quiz_responses ORDER BY created_at DESC
    `;

    return NextResponse.json({
      totalRecords: result.rows.length,
      records: result.rows,
    });

  } catch (error) {
    console.error('Error fetching all quiz data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch quiz data.', error: String(error) },
      { status: 500 }
    );
  }
}
