import type { Metadata } from "next";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteButton } from "@/components/twin/EliteButton";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { brand } from "@/lib/data";
import "../elite.css";

export const metadata: Metadata = {
  title: "About Bilal · Elite Listings",
  description:
    "Bilal Naqsh, Real Estate Advisor on the Vancouver Elite Team at Coldwell Banker Prestige Realty. Residential, commercial and development across Greater Vancouver, in English, Farsi and Hindi.",
};

/**
 * /about rebuilt in the elite system (matches the other elite pages): the studio portrait leads the identity,
 * then a proof band pairs his own sold board with the verifiable numbers, then the team and brokerage behind
 * him. Everything is real (content-pack); the 80+/800+ figures belong to the brokerage / the team's arm and
 * are labelled as such. No other individuals are named. One verb throughout: book a call.
 */
export default function AboutPage() {
  const facts = [
    { k: "Role", v: `${brand.role}, ${brand.team}` },
    { k: "Brokerage", v: brand.brokerage },
    { k: "Education", v: brand.education },
    { k: "Languages", v: brand.languages.join(", ") },
    { k: "Base", v: "Yaletown, West Vancouver, Burnaby" },
    { k: "Lines", v: "Residential, commercial, development" },
  ];

  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      {/* Identity: studio portrait + intro + facts */}
      <section className="abx" data-ground="light" aria-labelledby="abx-title">
        <div className="abx__grid">
          <div>
            <figure className="abx__portrait" data-reveal="clip">
              <img src="/images/about-portrait.webp" alt={`${brand.realtor}, ${brand.role}`} loading="eager" fetchPriority="high" decoding="async" />
            </figure>
            <figcaption className="abx__portcap" data-reveal="up" data-reveal-delay="0.1">{brand.realtor} &middot; {brand.role}</figcaption>
          </div>

          <div>
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />About Bilal</p>
            <h1 className="abx__hl" id="abx-title" data-reveal-01="lines" data-scroll>Trusted, strategic, <span className="em">local.</span></h1>
            <div className="abx__bio">
              <p data-reveal="up" data-reveal-delay="0.06">
                {brand.realtor} is a {brand.role} on the {brand.team} at {brand.brokerage}. He works residential, commercial and
                development across {brand.market}, from Yaletown to West Vancouver to Burnaby, and he does it in {brand.languages.join(", ")}.
              </p>
              <p data-reveal="up" data-reveal-delay="0.1">
                A University of British Columbia graduate, he built Elite Listings on one idea: help people buy smart and sell
                strong, and treat every move like it matters.
              </p>
            </div>
            <div className="abx__quotes" data-reveal="up" data-reveal-delay="0.14">
              <span>&ldquo;{brand.voice.positioning}.&rdquo;</span>
              <span>&ldquo;{brand.voice.promise}.&rdquo;</span>
            </div>

            <dl className="abx__facts" data-reveal-group="up">
              {facts.map((f) => (
                <div className="abx__fact" data-reveal-item key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="abx__cta" data-reveal="up">
              <EliteButton href="/contact" variant="primary">Book a call with {brand.realtor.split(" ")[0]}</EliteButton>
            </div>
          </div>
        </div>
      </section>

      {/* Behind him: institutional backing, as a statement + two focal-number panels (not a list) */}
      <section className="abt sec sec--cream" data-ground="light" aria-labelledby="abt-title">
        <div className="abt__grid">
          <div className="abt__lead">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Behind him</p>
            <h2 className="eh__hl" id="abt-title" data-reveal-01="lines" data-scroll>He doesn&rsquo;t work <span className="em">alone.</span></h2>
            <p className="abt__leadsub" data-reveal="up" data-reveal-delay="0.06">
              Elite Listings is {brand.realtor}, one advisor you deal with start to finish, with a full-service brokerage and
              the {brand.team}&rsquo;s management arm behind him when a deal needs more than one set of hands.
            </p>
          </div>
          <div className="abt__cards" data-reveal-group="up">
            <article className="abt__card" data-reveal-item>
              <span className="abt__cardnum">80<i>+</i></span>
              <h3 className="abt__cardname">{brand.brokerage}</h3>
              <p className="abt__cardnote">The brokerage behind him, more than 80 Realtors strong.</p>
            </article>
            <article className="abt__card" data-reveal-item>
              <span className="abt__cardnum">800<i>+</i></span>
              <h3 className="abt__cardname">Vancouver Rent-It</h3>
              <p className="abt__cardnote">The team&rsquo;s management arm, with more than 800 rental properties across {brand.market}.</p>
            </article>
          </div>
        </div>
      </section>

      <EliteFooter />
    </main>
  );
}
