import { sql } from '@vercel/postgres';

async function deleteTestData() {
  try {
    console.log('Deleting all records from quiz_responses...');
    const result = await sql`DELETE FROM quiz_responses`;
    console.log(`✅ Deleted ${result.rowCount} records`);

    // Verify deletion
    const check = await sql`SELECT COUNT(*) as count FROM quiz_responses`;
    console.log(`Remaining records: ${check.rows[0].count}`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

deleteTestData();
