import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    POSTGRES_URL: process.env.POSTGRES_URL ? 'EXISTS' : 'MISSING',
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE ? 'EXISTS' : 'MISSING',
    POSTGRES_HOST: process.env.POSTGRES_HOST ? 'EXISTS' : 'MISSING',
    PGHOST: process.env.PGHOST ? 'EXISTS' : 'MISSING',
    PGDATABASE: process.env.PGDATABASE ? 'EXISTS' : 'MISSING',
    PGUSER: process.env.PGUSER ? 'EXISTS' : 'MISSING',
    PGPASSWORD: process.env.PGPASSWORD ? 'EXISTS' : 'MISSING',
    allEnvKeys: Object.keys(process.env).filter(key =>
      key.includes('POSTGRES') || key.includes('PG') || key.includes('NEON')
    ),
  };

  return NextResponse.json(envVars);
}
