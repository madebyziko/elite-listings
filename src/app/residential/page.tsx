import type { Metadata } from "next";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteFilmHero } from "@/components/twin/EliteFilmHero";
import { EliteButton } from "@/components/twin/EliteButton";
import { EliteMortgage } from "@/components/twin/EliteMortgage";
import { EliteListingScroll } from "@/components/twin/EliteListingScroll";
import { EliteFaq } from "@/components/twin/EliteFaq";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { lines, scope, brand, teamProof } from "@/lib/data";
import "../elite.css";

export const metadata: Metadata = {
  title: "Residential · Elite Listings, Bilal Naqsh",
  description:
    "Buying or selling a home in Greater Vancouver with Bilal Naqsh: valuation, listings, showings, offers and the close, handled personally. Owners can be set up with property management.",
};

/**
 * /residential rebuilt in the elite design system (matches the /twin home): the widest, warmest door. Sellers
 * start with a valuation, buyers with his listings and a call, owners with management support. One primary
 * verb, book a call, drives to the footer form. Proof is this line's only. Ground rhythm alternates
 * dark/cream so the fixed nav recolours and each panel rises over the last.
 */
export default function ResidentialPage() {
  const l = lines.residential;
  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      <EliteFilmHero
        eyebrow="Residential"
        lead={["Buying or selling", "a home in"]}
        accent="Greater Vancouver."
        sub={l.promise}
        primary={{ label: l.cta, href: "#contact" }}
        secondary={{ label: "Browse listings", href: "/listings" }}
        seq={{ count: 60, dir: "/elite/res-seq" }}
        mobileVideo={{ src: "/elite/res-hero.mp4", poster: "/elite/res-seq/f_001.webp" }}
        posterAlt={l.photo.alt}
      />

      {/* Two wedges: sellers start with a valuation, buyers with a call */}
      <section className="wd sec sec--cream" data-ground="light" aria-labelledby="wd-selling">
        <div className="wd__grid">
          <div>
            <div className="eh">
              <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Selling</p>
              <h2 className="eh__hl" id="wd-selling" data-reveal-01="lines" data-scroll>Know what it&rsquo;s <span className="em">worth.</span></h2>
            </div>
            <p className="wd__lede" data-reveal="up" data-reveal-delay="0.08">
              A valuation with us is a conversation about your home and the market it&rsquo;s going into, not a number in an email.
            </p>
            <ol className="wd__list" data-reveal-group="up">
              {scope.residential.selling.map((s, i) => (
                <li className="wd__item" data-reveal-item key={s}>
                  <span className="wd__tick wd__tick--l" aria-hidden="true" />
                  <span className="wd__n" aria-hidden="true">0{i + 1}</span>
                  <span className="wd__text">{s}</span>
                  <span className="wd__tick wd__tick--r" aria-hidden="true" />
                </li>
              ))}
            </ol>
            <div className="wd__cta" data-reveal="up">
              <EliteButton href="#contact" variant="primary">Request a home valuation</EliteButton>
            </div>
          </div>

          <div>
            <div className="eh">
              <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Buying</p>
              <h2 className="eh__hl" data-reveal-01="lines" data-scroll>Find the right <span className="em">home.</span></h2>
            </div>
            <p className="wd__lede" data-reveal="up" data-reveal-delay="0.08">
              Our listings are below. For the rest of the market, one call is enough to start your search.
            </p>
            <ol className="wd__list" data-reveal-group="up">
              {scope.residential.buying.map((s, i) => (
                <li className="wd__item" data-reveal-item key={s}>
                  <span className="wd__tick wd__tick--l" aria-hidden="true" />
                  <span className="wd__n" aria-hidden="true">0{i + 1}</span>
                  <span className="wd__text">{s}</span>
                  <span className="wd__tick wd__tick--r" aria-hidden="true" />
                </li>
              ))}
            </ol>
            <div className="wd__cta" data-reveal="up">
              <EliteButton href="#contact" variant="primary">{l.cta}</EliteButton>
            </div>
          </div>
        </div>
      </section>

      {/* His curated listings — pinned split-scroll showcase, links to each detail page */}
      <EliteListingScroll />

      {/* Buyer tool: mortgage estimate */}
      <section className="mg sec sec--cream" data-ground="light" aria-labelledby="mg-title">
        <div className="mg__wrap">
          <div className="eh">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Buyers</p>
            <h2 className="eh__hl" id="mg-title" data-reveal-01="lines" data-scroll>What would it cost <span className="em">a month?</span></h2>
            <p className="eh__sub" data-reveal="up" data-reveal-delay="0.08">Your price, your down payment, your rate. An estimate for planning, not a quote.</p>
          </div>
          <EliteMortgage />
        </div>
      </section>

      {/* Owners and landlords: property management folds into residential, anchored by the team's scale */}
      <section className="om sec sec--dark" data-ground="dark" aria-labelledby="om-title">
        <div className="om__head">
          <p className="om__tag" data-reveal="up"><span className="om__mk" aria-hidden="true" />Owners and landlords</p>
          <h2 className="om__hl" id="om-title" data-reveal-01="lines" data-scroll>Ownership, made more <span className="em">manageable.</span></h2>
          <p className="om__sub" data-reveal="up" data-reveal-delay="0.06">
            Prefer to keep your place earning without the day to day? We&rsquo;ll set you up with the team&rsquo;s management arm.
          </p>
        </div>
        <p className="om__stat" data-reveal="scale">
          <span className="om__statnum">800<span className="om__statplus">+</span></span>
          <span className="om__statlabel">rental properties managed across {brand.market} by {teamProof[1].who}, the team&rsquo;s management arm. Scope and fees are confirmed once your property has been reviewed.</span>
        </p>
        <ul className="om__list" data-reveal-group="up">
          {scope.residential.owners.map((o, i) => (
            <li className="om__item" data-reveal-item key={o.name}>
              <span className="om__fill" aria-hidden="true" />
              <span className="om__idx" aria-hidden="true">0{i + 1}</span>
              <span className="om__swap">
                <span className="om__name">{o.name}</span>
                <span className="om__what">{o.what}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="om__cta" data-reveal="up">
          <EliteButton href="#contact" variant="ghost">Ask about your rental</EliteButton>
        </div>
      </section>

      {/* FAQ — resolve last doubts at the point of decision (real questions, honest no-MLS answer) */}
      <EliteFaq />

      <EliteFooter />
    </main>
  );
}
