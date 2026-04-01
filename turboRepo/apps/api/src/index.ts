import './env';
import express from 'express';
import { db, users } from '@repo/db';

const app = express();

async function seedUsersIfEmpty() {
  const existing = await db.select().from(users);
  if (existing.length > 0) return;

  await db.insert(users).values([
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Doe', email: 'jane.doe@example.com' },
    { name: 'John Smith', email: 'john.smith@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
  ]);
}

app.get('/', (req, res) => res.json({ message: 'Hello World' }));

app.get('/users', async (_req, res) => {
  const rows = await db.select().from(users);
  res.json(rows);
});

const port = 8080;
app.listen(port, async () => {
  await seedUsersIfEmpty();
  console.log(`API running on port ${port}`);
});
