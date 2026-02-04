
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon typically requires SSL but with self-signed certs or standard CA, often rejectUnauthorized: false is needed for serverless environments unless fully configured
  }
});

export default pool;
