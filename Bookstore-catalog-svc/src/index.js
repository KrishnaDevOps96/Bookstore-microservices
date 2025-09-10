import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const SERVICE_NAME = 'catalog';

const dbCfg = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.get('/health', (_, res) => res.json({ ok: true, service: SERVICE_NAME }));

app.get('/api/catalog/books', async (_, res) => {
  const conn = await mysql.createConnection(dbCfg);
  const [rows] = await conn.execute('SELECT id, title, price, stock FROM books');
  await conn.end();
  res.json(rows);
});

app.listen(PORT, () => console.log(`${SERVICE_NAME} service on :${PORT}`));