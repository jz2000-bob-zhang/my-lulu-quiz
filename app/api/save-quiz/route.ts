import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

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
    const body: QuizData = await request.json();
    const { quizId, answers, luluQuestions, isComplete = false } = body;

    // Use a consistent key for each quiz session
    const key = `quiz:${quizId}`;

    // Get existing data if any
    const existingDataStr = await kv.get(key);
    const existingData = existingDataStr ? JSON.parse(existingDataStr as string) : {};

    // Prepare the data for storage
    const results = {
      quizId,
      luluAnswers: { ...existingData.luluAnswers, ...answers },
      luluQuestionsForBob: luluQuestions || existingData.luluQuestionsForBob || [],
      isComplete,
      lastUpdated: new Date().toISOString(),
      submittedAt: isComplete ? new Date().toISOString() : existingData.submittedAt,
    };

    // Use kv.set() to store the entire results object.
    // Set expiration to 30 days (2592000 seconds)
    await kv.set(key, JSON.stringify(results), { ex: 2592000 });

    // Return a success response
    return NextResponse.json({
      message: isComplete ? 'Quiz completed and saved!' : 'Progress saved successfully!',
      storageKey: key,
    });

  } catch (error) {
    console.error('Error saving quiz data to Vercel KV:', error);

    // Return a generic error response
    return NextResponse.json(
      { message: 'Failed to save quiz data.' },
      { status: 500 }
    );
  }
}