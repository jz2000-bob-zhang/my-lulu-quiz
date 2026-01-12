-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS quiz_responses (
  id SERIAL PRIMARY KEY,
  quiz_id VARCHAR(255) NOT NULL,
  lulu_answers JSONB NOT NULL DEFAULT '{}',
  lulu_questions_for_bob JSONB NOT NULL DEFAULT '[]',
  is_complete BOOLEAN NOT NULL DEFAULT FALSE,
  last_updated TIMESTAMP NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_quiz_id ON quiz_responses(quiz_id);
CREATE INDEX IF NOT EXISTS idx_is_complete ON quiz_responses(is_complete);

-- Create or replace function to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update last_updated
DROP TRIGGER IF EXISTS update_quiz_responses_last_updated ON quiz_responses;
CREATE TRIGGER update_quiz_responses_last_updated
  BEFORE UPDATE ON quiz_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated();
