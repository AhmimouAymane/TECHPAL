import type { Dict } from "@/content/fr";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { Container, SectionLabel } from "../ui/Container";

export function Narrative({ dict }: { dict: Dict }) {
  const blocks = dict.narrative.blocks;
  return (
    <section className="py-24 md:py-36">
      <Container className="flex flex-col gap-24 md:gap-32">
        {blocks.map((b, i) => (
          <Reveal key={b.title}>
            <div className="grid gap-8 md:grid-cols-[0.4fr_1fr] md:gap-16">
              <SectionLabel index={String(i + 1).padStart(2, "0")}>{b.kicker}</SectionLabel>
              <div>
                <SplitText as="h2" text={b.title} className="display display-lg text-gradient max-w-[24ch] text-balance" />
                <p className="mt-6 max-w-[52ch] leading-relaxed text-muted">{b.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
