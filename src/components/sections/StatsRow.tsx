import type { Dict } from "@/content/fr";
import { Reveal } from "../motion/Reveal";
import { ScrambleText } from "../motion/ScrambleText";
import { Container } from "../ui/Container";

export function StatsRow({ dict }: { dict: Dict }) {
  const items = dict.stats.items;
  return (
    <section className="relative overflow-hidden border-y border-brand/20 bg-gradient-to-br from-brand via-[#04106b] to-[#02073a] py-20 text-paper md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-0 h-[440px] w-[440px] rounded-full bg-accent/25 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-[-12%] h-[380px] w-[380px] rounded-full bg-[#6d7bff]/25 blur-[130px]" />

      <Container className="relative">
        <div className="flex items-center gap-3 text-paper/60">
          <span className="label">
            <ScrambleText text={dict.stats.kicker} />
          </span>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="flex flex-col gap-3">
                <dd className="display display-lg text-gradient-paper">{s.value}</dd>
                <dt className="max-w-[22ch] text-sm text-paper/60">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
