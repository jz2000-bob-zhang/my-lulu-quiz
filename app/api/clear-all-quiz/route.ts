import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST() {
  try {
    // Delete all records
    const result = await sql`DELETE FROM quiz_responses`;

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
