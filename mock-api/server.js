import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8090);
const idempotentResponses = new Map();

app.use(cors());
app.use(express.json());

const calls = [
  {
    id: 'call_demo_1',
    call_id: 'call_demo_1',
    started_at: '2026-04-17T11:00:00Z',
    duration_sec: 95,
    attempt_status: 'answered',
    conversation_outcome: 'callback',
    handoff_result: 'not_required',
    next_action: 'manager_callback',
    quality: 7.8,
    risk: 'medium',
    scenario_version: 'outbound-audit@1.2.0',
    knowledge_version: 'seller-faq@2026-04'
  },
  {
    id: 'call_demo_2',
    call_id: 'call_demo_2',
    started_at: '2026-04-17T11:05:00Z',
    duration_sec: 142,
    attempt_status: 'answered',
    conversation_outcome: 'appointment',
    handoff_result: 'completed',
    next_action: 'confirm_appointment',
    quality: 8.5,
    risk: 'low',
    scenario_version: 'clinic-inbound@2.0.1',
    knowledge_version: 'clinic-knowledge@2026-04'
  }
];

const leads = [
  {
    id: 'lead_demo_1',
    name: 'Demo Lead',
    phone: '+79990001122',
    source: 'incoming_ai',
    stage: 'consultation',
    next_action: 'manager_callback'
  }
];

const campaigns = [
  {
    id: 'campaign_demo_1',
    name: 'Marketplace audit pilot',
    status: 'active',
    scenario_version: 'outbound-audit@1.2.0',
    knowledge_version: 'seller-faq@2026-04',
    consent_required: true,
    dnc_check_required: true,
    contacts_total: 2500,
    attempts_completed: 21,
    budget_status: 'within_limit'
  }
];

const knowledgeBases = [
  {
    id: 'kb_demo_1',
    name: 'Seller FAQ',
    version: 'seller-faq@2026-04',
    status: 'published',
    access_scope: 'tenant',
    citations_required: true
  },
  {
    id: 'kb_demo_2',
    name: 'Clinic knowledge',
    version: 'clinic-knowledge@2026-04',
    status: 'published',
    access_scope: 'tenant',
    citations_required: true
  }
];

function readIdempotencyKey(req) {
  const value = req.get('Idempotency-Key');
  return value && value.trim() ? value.trim() : null;
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'callpulse-showcase-mock', mode: 'mock' });
});

app.get('/api/platform/overview', (_req, res) => {
  res.json({
    mode: 'mock',
    control_plane: true,
    voice_runtime: 'contract_only',
    modules: {
      call_intelligence: 'demo',
      inbound_voice_ai: 'contract_only',
      outbound_campaigns: 'demo',
      crm: 'demo',
      knowledge_rag: 'demo',
      billing: 'demo',
      operations: 'demo'
    },
    privacy_note: 'Synthetic data only. No telephony or AI provider is connected.'
  });
});

app.get('/api/calls', (_req, res) => {
  res.json({ items: calls });
});

app.get('/api/calls/:id', (req, res) => {
  const call = calls.find((item) => item.id === req.params.id);
  if (!call) {
    res.status(404).json({ error: { code: 'not_found', message: 'Synthetic call not found.' } });
    return;
  }
  res.json({ item: call });
});

app.get('/api/crm/leads', (_req, res) => {
  res.json({ items: leads });
});

app.post('/api/crm/leads', (req, res) => {
  const lead = {
    id: `lead_demo_${leads.length + 1}`,
    name: String(req.body?.name || 'New Demo Lead'),
    phone: String(req.body?.phone || ''),
    source: String(req.body?.source || 'manual'),
    stage: 'new',
    next_action: 'qualification'
  };
  leads.unshift(lead);
  res.status(201).json({ ok: true, lead });
});

app.get('/api/control/campaigns', (_req, res) => {
  res.json({ items: campaigns });
});

app.post('/api/control/campaigns', (req, res) => {
  const key = readIdempotencyKey(req);
  if (key && idempotentResponses.has(key)) {
    res.status(200).json({ ...idempotentResponses.get(key), idempotent_replay: true });
    return;
  }

  const campaign = {
    id: `campaign_demo_${campaigns.length + 1}`,
    name: String(req.body?.name || 'New demo campaign'),
    status: 'draft',
    scenario_version: String(req.body?.scenario_version || 'outbound-audit@1.2.0'),
    knowledge_version: String(req.body?.knowledge_version || 'seller-faq@2026-04'),
    consent_required: true,
    dnc_check_required: true,
    contacts_total: Number(req.body?.contacts_total || 0),
    attempts_completed: 0,
    budget_status: 'not_reserved'
  };
  const response = { ok: true, campaign };
  campaigns.unshift(campaign);
  if (key) idempotentResponses.set(key, response);
  res.status(201).json(response);
});

app.get('/api/knowledge/bases', (_req, res) => {
  res.json({ items: knowledgeBases });
});

app.get('/api/consents/dnc', (_req, res) => {
  res.json({
    mode: 'mock',
    checks_before_dial: ['consent', 'dnc', 'local_time', 'attempt_limit', 'budget'],
    items: [{ contact_ref: 'contact_demo_1', consent_status: 'granted', dnc_status: 'clear' }]
  });
});

app.get('/api/billing/usage', (_req, res) => {
  res.json({
    currency: 'RUB',
    period: '2026-04',
    items: [
      { component: 'stt', amount: 18.4 },
      { component: 'llm_rag', amount: 12.1 },
      { component: 'tts', amount: 9.7 },
      { component: 'telephony', amount: 14.2 }
    ],
    budget_status: 'within_limit',
    synthetic: true
  });
});

app.get('/api/ops/health', (_req, res) => {
  res.json({
    mode: 'mock',
    components: [
      { name: 'control_api', status: 'healthy' },
      { name: 'queue', status: 'healthy' },
      { name: 'voice_runtime', status: 'contract_only' },
      { name: 'telephony_provider', status: 'not_connected' }
    ]
  });
});

app.get('/api/sales/overview', (_req, res) => {
  res.json({
    mode: 'mock',
    accepted_calls: 21,
    ai_closed: 12,
    transferred_to_operator: 9,
    crm_leads: leads.length,
    success_rate_percent: 57.1
  });
});

app.listen(port, () => {
  console.log(`CallPulse showcase mock API listening on :${port}`);
});
