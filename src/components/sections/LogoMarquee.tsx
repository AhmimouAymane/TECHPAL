import Image from "next/image";
import { tech } from "@/content/site";
import { Marquee } from "../motion/Marquee";
import { ScrambleText } from "../motion/ScrambleText";
import { Container } from "../ui/Container";

export function LogoMarquee({ label }: { label: string }) {
  return (
    <section className="border-y border-line bg-brand-soft/60 py-8">
      <Container className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <span className="label shrink-0 text-brand">
          <ScrambleText text={label} />
        </span>
        <Marquee className="w-full flex-1 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          {tech.map((t) => (
            <span key={t.name} className="mx-7 flex items-center gap-3 text-ink/60 md:mx-10">
              {t.logo ? <Image src={t.logo} alt="" width={22} height={22} className="h-5 w-5 object-contain opacity-70" /> : null}
              <span className="whitespace-nowrap font-mono text-sm">{t.name}</span>
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
