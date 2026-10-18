"use client";

import { useState } from "react";
import type { Dict } from "@/content/fr";

export function ContactForm({ dict }: { dict: Dict }) {
  const f = dict.contactPage.form;
  const [sent, setSent] = useState(false);
  const field =
    "w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder={f.name} aria-label={f.name} className={field} />
        <input required type="email" name="email" placeholder={f.email} aria-label={f.email} className={field} />
      </div>
      <input name="company" placeholder={f.company} aria-label={f.company} className={field} />
      <textarea required rows={5} name="message" placeholder={f.messagePh} aria-label={f.message} className={field} />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="stroke-btn inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          {f.send} <span aria-hidden>↗</span>
        </button>
        <p className="text-xs text-muted">
          {sent ? "✓ " : ""}
          {f.note}
        </p>
      </div>
    </form>
  );
}
