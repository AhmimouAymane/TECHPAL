import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) hits.clear();
  return list.length > 5;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "badjson" }, { status: 400 });
  }

  // Honeypot : les bots remplissent ce champ invisible
  if (clean(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 120);
  const company = clean(payload.company, 100);
  const message = typeof payload.message === "string" ? payload.message.trim().slice(0, 4000) : "";

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? user;

  if (!host || !user || !pass || !to) {
    console.error("contact: SMTP_* env vars missing");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `TECHPAL - Contact site web : ${name}${company ? ` (${company})` : ""}`;
    const text = `Nom : ${name}\nEmail : ${email}\nSociete : ${company || "-"}\n\nMessage :\n${message}`;

    await transporter.sendMail({
      from: `TECHPAL site web <${user}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
}
