import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Define the structure of the data we expect to receive
interface QuizData {
  quizId: string;
  answers: Record<number, string>;
  luluQuestions: string[];
}

// Main POST handler for the API route
export async function POST(request: Request) {
  try {
    const body: QuizData = await request.json();
    const { quizId, answers, luluQuestions } = body;

    // Prepare the data for storage
    const results = {
      quizId,
      luluAnswers: answers,
      luluQuestionsForBob: luluQuestions,
      submittedAt: new Date().toISOString(),
    };

    // --- Vercel KV Storage ---
    // The Vercel KV client is automatically configured by environment variables
    // when deployed on Vercel. For local development, you'll need to link
    // your project to a Vercel KV store. See the deployment guide for details.

    // We'll create a unique key for this quiz submission.
    const key = `quiz:${quizId}:${new Date().getTime()}`;
    
    // Use kv.set() to store the entire results object.
    await kv.set(key, JSON.stringify(results));

    // Return a success response
    return NextResponse.json({
      message: 'Quiz data saved successfully!',
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