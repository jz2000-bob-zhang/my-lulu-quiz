import { NextResponse } from 'next/server';
import OSS from 'ali-oss';

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

    // --- OSS Configuration ---
    // IMPORTANT: These credentials should be set as environment variables
    // in your deployment environment. Create a .env.local file in the root
    // of your project for local development.
    //
    // .env.local file content:
    // OSS_REGION=your-oss-region
    // OSS_ACCESS_KEY_ID=your-access-key-id
    // OSS_ACCESS_KEY_SECRET=your-access-key-secret
    // OSS_BUCKET=your-bucket-name
    //
    const client = new OSS({
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
    });

    // Prepare the data for upload
    const results = {
      quizId,
      luluAnswers: answers,
      luluQuestionsForBob: luluQuestions,
      submittedAt: new Date().toISOString(),
    };

    // Define the path and filename in the OSS bucket
    const fileName = `quiz-results/${quizId}-${new Date().getTime()}.json`;
    
    // Upload the data as a JSON file
    const result = await client.put(
      fileName,
      Buffer.from(JSON.stringify(results, null, 2)), // Use Buffer for content
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return a success response
    return NextResponse.json({
      message: 'Quiz data saved successfully!',
      ossUrl: result.url,
    });

  } catch (error) {
    console.error('Error saving quiz data to OSS:', error);
    
    // Return a generic error response
    return NextResponse.json(
      { message: 'Failed to save quiz data.' },
      { status: 500 }
    );
  }
}
