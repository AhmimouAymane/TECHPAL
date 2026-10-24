"use client";

import { useState } from "react";
import type { Dict } from "@/content/fr";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ dict }: { dict: Dict }) {
  const f = dict.contactPage.form;
  const [status, setStatus] = useState<Status>("idle");
  const field =
    "w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (status === "sending") return;
        const form = e.currentTarget;
        const data = new FormData(form);
        setStatus("sending");
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            company: data.get("company"),
            message: data.get("message"),
            website: data.get("website"),
          }),
        })
          .then((r) => {
          if (r.ok) {
            form.reset();
            setStatus("sent");
          } else setStatus("error");
        })
          .catch(() => setStatus("error"));
      }}
      className="grid gap-4"
    >
      {/* Honeypot anti-spam, invisible */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder={f.name} aria-label={f.name} className={field} />
        <input required type="email" name="email" placeholder={f.email} aria-label={f.email} className={field} />
      </div>
      <input name="company" placeholder={f.company} aria-label={f.company} className={field} />
      <textarea required rows={5} name="message" placeholder={f.messagePh} aria-label={f.message} className={field} />
      <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer select-none">
        <input type="checkbox" required className="mt-0.5 rounded border-line text-ink accent-ink focus:ring-0" />
        <span>{f.consent}</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="stroke-btn inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {f.send} <span aria-hidden="true">↗</span>
        </button>
        <p className="text-xs text-muted" role={status === "error" ? "alert" : undefined}>
          {status === "sent" ? `✓ ${f.success}` : ""}
          {status === "sending" ? f.sending : ""}
          {status === "error" ? `⚠ ${f.error}` : ""}
          {status === "idle" ? f.note : ""}
        </p>
      </div>
      {status === "sent" ? <input type="hidden" /> : null}
    </form>
  );
}
