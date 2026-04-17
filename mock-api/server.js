import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const calls = [
  {
    id: 'call_demo_1',
    started_at: '2026-04-17T11:00:00Z',
    duration_sec: 95,
    status: 'processed',
    outcome: 'callback',
    quality: 7.8,
    risk: 'medium'
  },
  {
    id: 'call_demo_2',
    started_at: '2026-04-17T11:05:00Z',
    duration_sec: 142,
    status: 'processed',
    outcome: 'appointment',
    quality: 8.5,
    risk: 'low'
  }
];

const leads = [
  {
    id: 'lead_demo_1',
    name: 'Demo Lead',
    phone: '+79990001122',
    source: 'incoming_ai',
    stage: 'consultation'
  }
];

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'callpulse-showcase-mock' });
});

app.get('/api/calls', (_req, res) => {
  res.json({ items: calls });
});

app.get('/api/crm/leads', (_req, res) => {
  res.json({ items: leads });
});

app.post('/api/crm/leads', (req, res) => {
  const lead = {
    id: `lead_demo_${leads.length + 1}`,
    name: String(req.body?.name || 'New Lead'),
    phone: String(req.body?.phone || ''),
    source: String(req.body?.source || 'manual'),
    stage: 'new'
  };
  leads.unshift(lead);
  res.status(201).json({ ok: true, lead });
});

app.get('/api/sales/overview', (_req, res) => {
  res.json({
    ai_enabled: false,
    accepted_calls: 21,
    ai_closed: 12,
    transferred_to_operator: 9,
    crm_leads: leads.length,
    success_rate_percent: 57.1
  });
});

const port = Number(process.env.PORT || 8090);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`CallPulse showcase mock API listening on :${port}`);
});
