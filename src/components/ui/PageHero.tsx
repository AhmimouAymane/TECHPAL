import { KineticText } from "../motion/KineticText";
import { ScrambleText } from "../motion/ScrambleText";
import { Container, SectionLabel } from "../ui/Container";

export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-52">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-10 h-[380px] w-[380px] rounded-full bg-brand/10 blur-[140px]" />
      <Container className="relative">
        <SectionLabel>
          <ScrambleText text={kicker} />
        </SectionLabel>
        <KineticText as="h1" text={title} className="display display-xl mt-6 max-w-[18ch] text-balance" />
        {intro ? <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-muted">{intro}</p> : null}
      </Container>
    </section>
  );
}
