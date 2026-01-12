import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quizId');

    console.log('=== GET QUIZ API ===');
    console.log('Quiz ID:', quizId);

    if (!quizId) {
      return NextResponse.json(
        { message: 'quizId is required' },
        { status: 400 }
      );
    }

    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
      return NextResponse.json(
        { message: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const db = createPool({ connectionString });

    // Get the most recent record for this quiz_id
    const result = await db.sql`
      SELECT
        lulu_answers,
        lulu_questions_for_bob,
        is_complete,
        created_at,
        submitted_at
      FROM quiz_responses
      WHERE quiz_id = ${quizId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    console.log('Query result rows:', result.rows.length);

    if (result.rows.length === 0) {
      console.log('No records found');
      return NextResponse.json({
        answers: {},
        questions: [],
        isComplete: false,
      });
    }

    const record = result.rows[0];
    console.log('Record found:', record);
    console.log('lulu_answers:', record.lulu_answers);
    console.log('lulu_answers type:', typeof record.lulu_answers);

    const responseData = {
      answers: record.lulu_answers || {},
      questions: record.lulu_questions_for_bob || [],
      isComplete: record.is_complete || false,
      createdAt: record.created_at,
      submittedAt: record.submitted_at,
    };

    console.log('Returning data:', responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch quiz data.', error: String(error) },
      { status: 500 }
    );
  }
}
