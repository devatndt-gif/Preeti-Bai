import nodemailer from "nodemailer";
import { pool } from "@/lib/db";

type EmailConfig = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpSecure: boolean;
  fromEmail: string;
  fromName: string;
};

type SendOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

export async function getEmailConfig(tenantId: string): Promise<EmailConfig | null> {
  const result = await pool.query<{
    smtpHost: string | null;
    smtpPort: number | null;
    smtpUser: string | null;
    smtpPass: string | null;
    smtpSecure: boolean;
    fromEmail: string | null;
    fromName: string | null;
  }>(
    `SELECT "smtpHost", "smtpPort", "smtpUser", "smtpPass", "smtpSecure", "fromEmail", "fromName"
     FROM "Tenant" WHERE id = $1 LIMIT 1`,
    [tenantId]
  );

  const t = result.rows[0];
  if (!t?.smtpHost || !t?.smtpUser || !t?.smtpPass || !t?.fromEmail) return null;

  return {
    smtpHost:   t.smtpHost,
    smtpPort:   t.smtpPort ?? 587,
    smtpUser:   t.smtpUser,
    smtpPass:   t.smtpPass,
    smtpSecure: t.smtpSecure,
    fromEmail:  t.fromEmail,
    fromName:   t.fromName ?? t.smtpUser,
  };
}

// ZeptoMail's SMTP ports are blocked on some hosts, so route ZeptoMail through
// their HTTPS Email API instead — same Send Mail Token, different transport.
async function sendViaZeptoMailApi(config: EmailConfig, opts: SendOptions): Promise<{ ok: boolean; error?: string }> {
  const apiHost = config.smtpHost.replace(/^smtp\./, "api.");
  const recipients = (Array.isArray(opts.to) ? opts.to : opts.to.split(",")).map(addr => addr.trim());

  try {
    const res = await fetch(`https://${apiHost}/v1.1/email`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Zoho-enczapikey ${config.smtpPass}`,
      },
      body: JSON.stringify({
        from:     { address: config.fromEmail, name: config.fromName },
        to:       recipients.map(address => ({ email_address: { address } })),
        subject:  opts.subject,
        htmlbody: opts.html,
        textbody: opts.text ?? opts.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return { ok: false, error: body?.message ?? `ZeptoMail API error (${res.status})` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function sendEmail(config: EmailConfig, opts: SendOptions): Promise<{ ok: boolean; error?: string }> {
  if (config.smtpHost.includes("zeptomail")) {
    return sendViaZeptoMailApi(config, opts);
  }

  try {
    const transport = nodemailer.createTransport({
      host:   config.smtpHost,
      port:   config.smtpPort,
      secure: config.smtpSecure,
      auth:   { user: config.smtpUser, pass: config.smtpPass },
    });

    await transport.sendMail({
      from:    `"${config.fromName}" <${config.fromEmail}>`,
      to:      Array.isArray(opts.to) ? opts.to.join(", ") : opts.to,
      subject: opts.subject,
      html:    opts.html,
      text:    opts.text ?? opts.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    });

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}


// ── Email templates ───────────────────────────────────────────────────────────

const BRAND = "Preeti Sidhu Insurance and Investments";
const BRAND_PHONE = "+1 (416) 427-3232";
const BRAND_PHONE_HREF = "tel:+14164273232";
const RED = "#d31e32";
const NAVY = "#10314f";

/**
 * Lead-supplied values land inside an HTML email, so escape them. Without this a
 * name or message containing markup would be rendered as markup.
 */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(eyebrow: string, heading: string, body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 14px rgba(20,24,29,.09)">
    <div style="background:${NAVY};padding:28px 32px;border-bottom:4px solid ${RED}">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7)">${eyebrow}</p>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff">${heading}</h1>
    </div>
    <div style="padding:26px 32px">${body}</div>
    <div style="padding:16px 32px;border-top:1px solid #eae4de;text-align:center">
      <p style="margin:0;font-size:12px;color:#9a938c">${BRAND} &middot; Brampton, Ontario</p>
    </div>
  </div>
</body>
</html>`;
}

function clientConfirmationHtml(opts: { firstName: string; product?: string }) {
  const about = opts.product
    ? ` about <strong>${esc(opts.product)}</strong>`
    : "";
  return shell(
    BRAND,
    `Thank you, ${esc(opts.firstName)}`,
    `<p style="margin:0 0 16px;font-size:14px;color:#3d4650;line-height:1.65">
       We have received your request${about}. Preeti will review it personally and come
       back to you, usually within one business day, with options worth considering and
       the trade-offs between them.
     </p>
     <p style="margin:0 0 16px;font-size:14px;color:#3d4650;line-height:1.65">
       If it is time-sensitive &mdash; a Super Visa deadline or travel this week &mdash;
       please call <a href="${BRAND_PHONE_HREF}" style="color:${RED};font-weight:600">${BRAND_PHONE}</a>
       and we will deal with it straight away.
     </p>
     <p style="margin:0 0 6px;font-size:14px;color:#3d4650">There is no cost for the advice and no obligation to buy.</p>
     <p style="margin:18px 0 0;font-size:14px;color:#3d4650">&mdash; Preeti Sidhu</p>`
  );
}

function advisorNotificationHtml(opts: {
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  product?: string;
  message?: string;
  source?: string;
}) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:9px 14px;font-size:13px;color:#6b7580;white-space:nowrap;vertical-align:top">${label}</td>
           <td style="padding:9px 14px;font-size:14px;color:#14181d;font-weight:600">${esc(value)}</td>
         </tr>`
      : "";

  return shell(
    "New website enquiry",
    esc(opts.leadName),
    `<table style="width:100%;border-collapse:collapse;background:#faf8f6;border-radius:10px;overflow:hidden;margin-bottom:20px">
       ${row("Phone", opts.leadPhone)}
       ${row("Email", opts.leadEmail)}
       ${row("Interested in", opts.product)}
       ${row("Source", opts.source)}
     </table>
     ${
       opts.message
         ? `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6b7580">Message</p>
            <div style="background:#faf8f6;border-radius:10px;padding:14px 16px;font-size:14px;color:#3d4650;line-height:1.65">${esc(opts.message)}</div>`
         : ""
     }
     <p style="margin:22px 0 0;font-size:13px;color:#6b7580">
       Reply to this email or call <a href="tel:${esc(opts.leadPhone)}" style="color:${RED};font-weight:600">${esc(opts.leadPhone)}</a>.
     </p>`
  );
}

// ── High-level helpers called from API routes ─────────────────────────────────

export async function sendClientConfirmation(opts: {
  tenantId: string;
  to: string;
  firstName: string;
  product?: string;
}) {
  const config = await getEmailConfig(opts.tenantId);
  if (!config) return;

  await sendEmail(config, {
    to: opts.to,
    subject: `We have your request — ${BRAND}`,
    html: clientConfirmationHtml({ firstName: opts.firstName, product: opts.product }),
  });
}

export async function sendAdvisorNotification(opts: {
  tenantId: string;
  to: string;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  product?: string;
  message?: string;
  source?: string;
}) {
  const config = await getEmailConfig(opts.tenantId);
  if (!config) return;

  await sendEmail(config, {
    to: opts.to,
    subject: `New enquiry: ${opts.leadName}${opts.product ? ` — ${opts.product}` : ""}`,
    html: advisorNotificationHtml(opts),
  });
}

// ── Careers ───────────────────────────────────────────────────────────────────

type RecruitFields = {
  name: string;
  phone: string;
  email: string;
  city?: string;
  company?: string;
  licensing?: string;
  experience?: string;
  languages?: string;
  availability?: string;
  message?: string;
  cvUrl?: string;
};

function recruitNotificationHtml(opts: RecruitFields) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:9px 14px;font-size:13px;color:#6b7580;white-space:nowrap;vertical-align:top">${label}</td>
           <td style="padding:9px 14px;font-size:14px;color:#14181d;font-weight:600">${esc(value)}</td>
         </tr>`
      : "";

  return shell(
    "New career application",
    esc(opts.name),
    `<table style="width:100%;border-collapse:collapse;background:#faf8f6;border-radius:10px;overflow:hidden;margin-bottom:20px">
       ${row("Phone", opts.phone)}
       ${row("Email", opts.email)}
       ${row("City", opts.city)}
       ${row("Works as", opts.company)}
       ${row("Licensing", opts.licensing)}
       ${row("Experience", opts.experience)}
       ${row("Languages", opts.languages)}
       ${row("Availability", opts.availability)}
     </table>
     ${
       opts.message
         ? `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6b7580">Message</p>
            <div style="background:#faf8f6;border-radius:10px;padding:14px 16px;font-size:14px;color:#3d4650;line-height:1.65">${esc(opts.message)}</div>`
         : ""
     }
     ${
       opts.cvUrl
         ? `<p style="margin:18px 0 0;font-size:14px;color:#3d4650">
              CV attached to the sub-agent record &mdash;
              <a href="${esc(opts.cvUrl)}" style="color:${RED};font-weight:600">open it here</a>.
            </p>`
         : `<p style="margin:18px 0 0;font-size:14px;color:#6b7580">No CV was attached.</p>`
     }
     <p style="margin:16px 0 0;font-size:13px;color:#6b7580">
       They are on the sub-agent list as a pending recruit, with no agreement sent and
       commission at zero. Call <a href="tel:${esc(opts.phone)}" style="color:${RED};font-weight:600">${esc(opts.phone)}</a>.
     </p>`
  );
}

function recruitAcknowledgementHtml(firstName: string) {
  return shell(
    BRAND,
    `Thank you, ${esc(firstName)}`,
    `<p style="margin:0 0 16px;font-size:14px;color:#3d4650;line-height:1.65">
       We have your application to join the team. Preeti reads every one personally and
       will come back to you to arrange a conversation about the role, including the
       honest picture of the first six months.
     </p>
     <p style="margin:0 0 16px;font-size:14px;color:#3d4650;line-height:1.65">
       If anything changes in the meantime, or you would rather talk sooner, call
       <a href="${BRAND_PHONE_HREF}" style="color:${RED};font-weight:600">${BRAND_PHONE}</a>.
     </p>
     <p style="margin:18px 0 0;font-size:14px;color:#3d4650">&mdash; Preeti Sidhu</p>`
  );
}

export async function sendRecruitNotification(opts: RecruitFields & {
  tenantId: string;
  to: string;
}) {
  const config = await getEmailConfig(opts.tenantId);
  if (!config) return;

  await sendEmail(config, {
    to: opts.to,
    subject: `Career application: ${opts.name}${opts.licensing ? ` — ${opts.licensing}` : ""}`,
    html: recruitNotificationHtml(opts),
  });
}

export async function sendRecruitAcknowledgement(opts: {
  tenantId: string;
  to: string;
  firstName: string;
}) {
  const config = await getEmailConfig(opts.tenantId);
  if (!config) return;

  await sendEmail(config, {
    to: opts.to,
    subject: `We have your application — ${BRAND}`,
    html: recruitAcknowledgementHtml(opts.firstName),
  });
}
