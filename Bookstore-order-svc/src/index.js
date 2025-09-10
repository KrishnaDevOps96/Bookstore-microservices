import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const SERVICE_NAME = 'order';

const dbCfg = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.get('/health', (_, res) => res.json({ ok: true, service: SERVICE_NAME }));

app.post('/api/order', async (req, res) => {
  const { book_id, qty } = req.body;
  const conn = await mysql.createConnection(dbCfg);
  await conn.execute('INSERT INTO orders (book_id, qty, status) VALUES (?, ?, ?)', [book_id, qty, 'PLACED']);
  await conn.end();
  res.json({ status: 'PLACED' });
});

app.listen(PORT, () => console.log(`${SERVICE_NAME} service on :${PORT}`));