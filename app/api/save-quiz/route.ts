import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Define the structure of the data we expect to receive
interface QuizData {
  quizId: string;
  answers: Record<number, string>;
  luluQuestions?: string[];
  isComplete?: boolean;
}

// Ensure database connection is configured
function ensureConnection() {
  if (!process.env.POSTGRES_URL && !process.env.POSTGRES_DATABASE) {
    throw new Error('Database connection not configured. Please check environment variables.');
  }
}

// Main POST handler for the API route
export async function POST(request: Request) {
  try {
    ensureConnection();

    const body: QuizData = await request.json();
    const { quizId, answers, luluQuestions, isComplete = false } = body;

    // Check if a record already exists for this quiz_id
    const existingRecord = await sql`
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

      await sql`
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
      const result = await sql`
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