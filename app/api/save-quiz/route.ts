import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

// Define the structure of the data we expect to receive
interface QuizData {
  quizId: string;
  answers: Record<number, string>;
  luluQuestions?: string[];
  isComplete?: boolean;
}

// Main POST handler for the API route
export async function POST(request: Request) {
  try {
    // Use DATABASE_URL or POSTGRES_URL
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
      return NextResponse.json(
        { message: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const db = createPool({ connectionString });

    const body: QuizData = await request.json();
    const { quizId, answers, luluQuestions, isComplete = false } = body;

    // Check if a record already exists for this quiz_id
    const existingRecord = await db.sql`
      SELECT * FROM quiz_responses
      WHERE quiz_id = ${quizId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (existingRecord.rows.length > 0) {
      // Update existing record
      const existing = existingRecord.rows[0];
      const mergedAnswers = { ...existing.lulu_answers, ...answers };
      const updatedQuestions = luluQuestions || existing.lulu_questions_for_bob;

      await db.sql`
        UPDATE quiz_responses
        SET
          lulu_answers = ${JSON.stringify(mergedAnswers)}::jsonb,
          lulu_questions_for_bob = ${JSON.stringify(updatedQuestions)}::jsonb,
          is_complete = ${isComplete},
          submitted_at = ${isComplete ? new Date().toISOString() : existing.submitted_at}
        WHERE id = ${existing.id}
      `;

      return NextResponse.json({
        message: isComplete ? 'Quiz completed and saved!' : 'Progress saved successfully!',
        recordId: existing.id,
      });
    } else {
      // Insert new record
      const result = await db.sql`
        INSERT INTO quiz_responses (
          quiz_id,
          lulu_answers,
          lulu_questions_for_bob,
          is_complete,
          submitted_at
        )
        VALUES (
          ${quizId},
          ${JSON.stringify(answers)}::jsonb,
          ${JSON.stringify(luluQuestions || [])}::jsonb,
          ${isComplete},
          ${isComplete ? new Date().toISOString() : null}
        )
        RETURNING id
      `;

      return NextResponse.json({
        message: isComplete ? 'Quiz completed and saved!' : 'Progress saved successfully!',
        recordId: result.rows[0].id,
      });
    }

  } catch (error) {
    console.error('Error saving quiz data to Postgres:', error);

    // Return a generic error response
    return NextResponse.json(
      { message: 'Failed to save quiz data.', error: String(error) },
      { status: 500 }
    );
  }
}