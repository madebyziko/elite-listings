import type { Metadata } from "next";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteFilmHero } from "@/components/twin/EliteFilmHero";
import { EliteButton } from "@/components/twin/EliteButton";
import { EliteFaq } from "@/components/twin/EliteFaq";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { lines, scope, brand, proof, teamProof } from "@/lib/data";
import "../elite.css";

export const metadata: Metadata = {
  title: "Commercial · Elite Listings, Bilal Naqsh",
  description:
    "Buying or selling a business or commercial space in Greater Vancouver: restaurants, retail, convenience, gas, franchises, commercial real estate and leasing, handled confidentially until you say otherwise.",
};

/**
 * /commercial in the elite system, off the residential template. The discreet, numbers-led line: the breadth
 * of what we handle (business types as a chip cloud + the supporting blocks), how a deal runs, a confidentiality
 * promise that is the line's real differentiator, one honest proof deal, and the FAQ. One primary verb —
 * "Discuss a deal, confidentially" — drives to the footer form; a quiet second door emails for opportunities.
 * Ground rhythm alternates dark/cream so the fixed nav recolours and each panel rises over the last.
 */
export default function CommercialPage() {
  const l = lines.commercial;
  const opportunities = `mailto:${brand.email}?subject=${encodeURIComponent("Current commercial opportunities")}`;
  const [forSale, ...supporting] = scope.commercial.blocks;
  const types = forSale.what
    .replace(/\.$/, "")
    .split(", ")
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  const deal = proof.find((p) => p.line === "commercial");

  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      <EliteFilmHero
        eyebrow="Commercial"
        lead={["Buying or selling", "a business, or"]}
        accent="the space it's in."
        sub={l.promise}
        primary={{ label: l.cta, href: "#contact" }}
        secondary={{ label: "Request current opportunities", href: opportunities }}
        seq={{ count: 60, dir: "/elite/com-seq" }}
        mobileVideo={{ src: "/elite/com-hero.mp4", poster: "/elite/com-seq/f_060.webp", position: "100% 50%" }}
        posterAlt="Bilal at the counter of a Vancouver restaurant before service, reading the open kitchen at work behind the bar"
      />

      {/* What we handle — the breadth: business types as a chip cloud, then the supporting blocks */}
      <section className="cap sec sec--cream" data-ground="light" aria-labelledby="cap-title">
        <div className="cap__wrap">
          <div className="eh eh--wide">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />What we handle</p>
            <h2 className="eh__hl" id="cap-title" data-reveal-01="lines" data-scroll>Businesses, real estate, and the <span className="em">lease that holds it.</span></h2>
            <p className="eh__sub" data-reveal="up" data-reveal-delay="0.08">
              We handle the business, the real estate it sits in, and the lease that holds it, from a single local operator to an investment acquisition.
            </p>
          </div>

          <div className="cap__sale" data-reveal="up" data-reveal-delay="0.12">
            <p className="cap__saletag">{forSale.name}</p>
            <ul className="cap__chips" data-reveal-group="up">
              {types.map((t) => (
                <li className="cap__chip" data-reveal-item key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <ul className="cap__cols" data-reveal-group="up">
            {supporting.map((b) => (
              <li className="cap__col" data-reveal-item key={b.name}>
                <h3 className="cap__name">{b.name}</h3>
                <p className="cap__what">{b.what}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How a deal runs — one strategy, first review to close */}
      <section className="pr sec sec--dark" data-ground="dark" aria-labelledby="pr-title">
        <div className="pr__wrap">
          <div className="eh eh--wide">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />How a deal runs</p>
            <h2 className="eh__hl" id="pr-title" data-reveal-01="lines" data-scroll>One strategy, first review to <span className="em">close.</span></h2>
          </div>
          <ol className="pr__list" data-reveal-group="up">
            {scope.commercial.process.map((s, i) => (
              <li className="pr__item" data-reveal-item key={s.name}>
                <span className="pr__n" aria-hidden="true">0{i + 1}</span>
                <span className="pr__body">
                  <span className="pr__name">{s.name}</span>
                  <span className="pr__what">{s.what}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Confidential — the line's real differentiator, a centred statement + the primary verb */}
      <section className="cf sec sec--cream" data-ground="light" aria-labelledby="cf-title">
        <div className="eh eh--center">
          <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Confidential</p>
          <h2 className="eh__hl" id="cf-title" data-reveal-01="lines" data-scroll>Your staff and your landlord hear it <span className="em">from you.</span></h2>
          <p className="eh__sub" data-reveal="up" data-reveal-delay="0.08">
            We keep a business sale quiet: qualified buyers, confidentiality signed before any numbers, and your timing on when anyone else knows.
          </p>
        </div>
        <div className="cf__cta" data-reveal="up" data-reveal-delay="0.14">
          <EliteButton href="#contact" variant="primary">{l.cta}</EliteButton>
        </div>
      </section>

      {/* Proof — one honest, confirmed deal, and the institutional backing behind it. No invented figures. */}
      <section className="pf sec sec--dark" data-ground="dark" aria-labelledby="pf-title">
        <div className="pf__wrap">
          <div className="eh eh--wide">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Proof</p>
            <h2 className="eh__hl" id="pf-title" data-reveal-01="lines" data-scroll>A recent <span className="em">close.</span></h2>
          </div>
          <div className="pf__grid">
            {deal && (
              <figure className="pf__card" data-reveal="clip">
                <span className="pf__media">
                  {deal.image && <img src={deal.image} alt={deal.imageAlt ?? ""} loading="lazy" decoding="async" />}
                  <span className="pf__badge">{deal.status}.</span>
                </span>
                <figcaption className="pf__meta">
                  <span className="pf__place">{deal.kind} in {deal.place}</span>
                  <span className="pf__result">{deal.result}</span>
                </figcaption>
              </figure>
            )}
            <div className="pf__aside" data-reveal="up" data-reveal-delay="0.1">
              <p className="pf__asidetext">
                Every deal here is confirmed, never inflated. Behind them is {teamProof[0].who}, {teamProof[0].what.charAt(0).toLowerCase() + teamProof[0].what.slice(1)}
              </p>
              <p className="pf__asidenote">
                A business owner&rsquo;s verified account of a confidential sale will sit here once we have their permission to publish it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — resolve last doubts at the point of decision (confidentiality, breadth, the honest scope) */}
      <EliteFaq
        items={[
          {
            q: "Will my staff or landlord know the business is for sale?",
            a: "Not from us. Nothing goes to market until you say so: qualified buyers sign confidentiality before they see any numbers, and you decide when anyone else knows.",
          },
          {
            q: "What kinds of businesses do you handle?",
            a: "Restaurants and cafés, convenience and grocery, liquor, gas stations, franchises, retail, salons and wellness, fitness, medical and dental, pharmacies, automotive, daycares, hotels and motels, laundromats, professional services, and industrial operations.",
          },
          {
            q: "Do you handle the real estate and the lease, or just the business?",
            a: "All of it. The business, the real estate it sits in, and the lease that holds it, plus the sale structure, reviewed alongside your lawyer and accountant.",
          },
          {
            q: "Can I hear about opportunities before they are public?",
            a: "Yes. Tell us what you are looking for and we will send current commercial opportunities as they come up, before they are listed publicly.",
          },
        ]}
      />

      <EliteFooter />
    </main>
  );
}
