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

async function verifyCaptcha(token) {
  const secret = String(process.env.CONTACT_RECAPTCHA_SECRET || process.env.RECAPTCHA_SECRET || '').trim();
  if (!secret || token === 'disabled') return true;
  const params = new URLSearchParams({ secret, response: token });
  const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params,
  });
  const json = await r.json();
  return json.success === true;
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

  const captchaOk = await verifyCaptcha(String(body.captchaToken || ''));
  if (!captchaOk) {
    return res.status(400).json({ error: 'CAPTCHA_FAILED' });
  }

  const intent = normalizeText(body.intent, 20) || 'contacto';
  const nombre = normalizeText(body.nombre, 120);
  const email = normalizeText(body.email, 160).toLowerCase();
  const rol = normalizeText(body.rol, 100);
  const institucion = normalizeText(body.institucion, 200);
  const fecha = normalizeText(body.fecha, 20);
  const mensaje = normalizeText(body.mensaje, 4000);

  if (nombre.length < 2) {
    return res.status(400).json({ error: 'INVALID_NAME' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'INVALID_EMAIL' });
  }
  if (intent === 'demo' && institucion.length < 2) {
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

  const isDemo = intent === 'demo';
  const subjectLabel = isDemo ? 'Demo' : 'Contacto';
  const subjectSuffix = isDemo && institucion ? ` — ${institucion}` : '';

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px;">
      <h2 style="color: #0ea5e9;">Nueva solicitud de ${isDemo ? 'demo' : 'contacto'} — Ademy</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Nombre</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(nombre)}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Email</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
        ${rol ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Rol</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(rol)}</td></tr>` : ''}
        ${institucion ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Institución</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(institucion)}</td></tr>` : ''}
        ${fecha ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0;">Fecha preferida</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(fecha)}</td></tr>` : ''}
        ${mensaje ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f8fafc; border: 1px solid #e2e8f0; vertical-align: top;">Mensaje</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(mensaje)}</td></tr>` : ''}
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: `Ademy <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[${subjectLabel} Ademy] ${nombre}${subjectSuffix}`,
    html,
  });

  if (error) {
    console.error('[demo] Resend error:', error.message);
    return res.status(502).json({ error: 'EMAIL_SEND_FAILED' });
  }

  return res.status(201).json({ ok: true });
}
