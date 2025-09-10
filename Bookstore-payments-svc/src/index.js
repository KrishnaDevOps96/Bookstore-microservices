import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;
const SERVICE_NAME = 'payment';

app.get('/health', (_, res) => res.json({ ok: true, service: SERVICE_NAME }));

app.post('/api/payment/charge', async (req, res) => {
  // Dummy success
  res.json({ paid: true, txn_id: `txn_${Date.now()}` });
});

app.listen(PORT, () => console.log(`${SERVICE_NAME} service on :${PORT}`));