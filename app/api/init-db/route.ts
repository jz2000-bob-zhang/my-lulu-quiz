import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_responses (
        id SERIAL PRIMARY KEY,
        quiz_id VARCHAR(255) NOT NULL,
        lulu_answers JSONB NOT NULL DEFAULT '{}',
        lulu_questions_for_bob JSONB NOT NULL DEFAULT '[]',
        is_complete BOOLEAN NOT NULL DEFAULT FALSE,
        last_updated TIMESTAMP NOT NULL DEFAULT NOW(),
        submitted_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    // Create indexes
    await sql`
      CREATE INDEX IF NOT EXISTS idx_quiz_id ON quiz_responses(quiz_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_is_complete ON quiz_responses(is_complete)
    `;

    return NextResponse.json({
      message: 'Database initialized successfully!',
    });

  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { message: 'Failed to initialize database.', error: String(error) },
      { status: 500 }
    );
  }
}
