import type { Metadata } from "next";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteFilmHero } from "@/components/twin/EliteFilmHero";
import { EliteButton } from "@/components/twin/EliteButton";
import { EliteFeasibility } from "@/components/twin/EliteFeasibility";
import { EliteProcessDial } from "@/components/twin/EliteProcessDial";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { lines } from "@/lib/data";
import "../elite.css";

export const metadata: Metadata = {
  title: "Development · Elite Listings, Bilal Naqsh",
  description:
    "Land and development sites across Greater Vancouver: site sourcing, early feasibility and presales for landowners and small to mid developers. Numbers first, then the pro forma.",
};

/**
 * /development in the elite system, off the residential template. The numbers-first line: a POV premise (a low
 * land price does not make a good development), the four steps, and the feasibility calculator — the line's
 * differentiator — as the interactive finish that drives to the footer form. No proof section: no development
 * deal is printed until one is confirmed against his records (brief). Ground rhythm alternates dark/cream.
 */
export default function DevelopmentPage() {
  const l = lines.development;
  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      <EliteFilmHero
        eyebrow="Development"
        lead={["Holding land, or"]}
        accent="planning a project."
        sub={l.promise}
        primary={{ label: l.cta, href: "#contact" }}
        secondary={{ label: "Run a quick feasibility", href: "#feasibility" }}
        video={{ src: "/elite/dev-potential.mp4", poster: "/elite/dev-potential-poster.jpg" }}
        posterAlt={l.photo.alt}
      />

      {/* The premise — the numbers-first point of view, thesis left / the four things that decide it, right */}
      <section className="pm sec sec--cream" data-ground="light" aria-labelledby="pm-title">
        <div className="pm__grid">
          <div className="pm__thesis">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />The premise</p>
            <h2 className="eh__hl" id="pm-title" data-reveal-01="lines" data-scroll>A low land price doesn&rsquo;t make a good <span className="em">development.</span></h2>
            <p className="pm__lede" data-reveal="up" data-reveal-delay="0.08">
              A cheap site can still be the wrong buy. What decides it is the margin, run before the offer, not the asking price.
            </p>
          </div>

          <figure className="pm__card" data-reveal="up" data-reveal-delay="0.1">
            <span className="pm__cardtag">The number that decides it</span>
            <blockquote className="pm__cardquote">What it sells for, <span className="em">minus</span> what it costs to build.</blockquote>
            <p className="pm__cardnote">
              A low land price only helps if that number works. When the answer needs planning, design, legal, tax or financing people, we bring them in.
            </p>
          </figure>
        </div>
      </section>

      {/* How it runs — site, plan, budget, return, as a pinned circular gauge */}
      <EliteProcessDial />

      {/* Quick feasibility — the differentiator. The visitor's own numbers, then the verb */}
      <section id="feasibility" className="mg sec sec--cream" data-ground="light" aria-labelledby="fs-title">
        <div className="mg__wrap">
          <div className="eh">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Quick feasibility</p>
            <h2 className="eh__hl" id="fs-title" data-reveal-01="lines" data-scroll>Run the numbers before the <span className="em">pro forma.</span></h2>
            <p className="eh__sub" data-reveal="up" data-reveal-delay="0.08">Your figures, nothing pre-filled. A first pass on cost, revenue and margin.</p>
          </div>
          <EliteFeasibility />
          <div className="fs__cta" data-reveal="up">
            <EliteButton href="#contact" variant="primary">{l.cta}</EliteButton>
          </div>
        </div>
      </section>

      <EliteFooter />
    </main>
  );
}
