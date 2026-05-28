import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value, maxLen = 500) {
  return String(value || '').trim().slice(0, maxLen);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let cachedResend = null;

function getResendClient() {
  const apiKey = String(process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) throw new Error('RESEND_NOT_CONFIGURED');
  if (!cachedResend) cachedResend = new Resend(apiKey);
  return cachedResend;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const body = req.body || {};
  const nombre = normalizeText(body.nombre, 120);
  const email = normalizeText(body.email, 160).toLowerCase();
  const institucion = normalizeText(body.institucion, 200);
  const sedes = normalizeText(body.sedes, 20);
  const mensaje = normalizeText(body.mensaje, 4000);

  if (nombre.length < 2) {
    return res.status(400).json({ error: 'INVALID_NAME' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'INVALID_EMAIL' });
  }
  if (institucion.length < 2) {
    return res.status(400).json({ error: 'INVALID_INSTITUTION' });
  }

  const toEmail = String(process.env.DEMO_TO_EMAIL || 'samuel.v3r1@gmail.com').trim();
  const fromEmail = String(process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev').trim();

  let resend;
  try {
    resend = getResendClient();
  } catch {
    return res.status(503).json({ error: 'EMAIL_NOT_CONFIGURED' });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px;">
      <h2 style="color: #0ea5e9;">Nueva solicitud de demo — Ademy</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Nombre</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(nombre)}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Email</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Institución</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(institucion)}</td></tr>
        ${sedes ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Sedes</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(sedes)}</td></tr>` : ''}
        ${mensaje ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0; vertical-align: top;">Mensaje</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(mensaje)}</td></tr>` : ''}
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: `Ademy <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Demo Ademy] ${nombre} — ${institucion}`,
    html,
  });

  if (error) {
    console.error('[demo] Resend error:', error.message);
    return res.status(502).json({ error: 'EMAIL_SEND_FAILED' });
  }

  return res.status(201).json({ ok: true });
}
