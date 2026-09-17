import type { Metadata } from "next";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteButton } from "@/components/twin/EliteButton";
import { EliteContactForm } from "@/components/twin/EliteContactForm";
import { EliteSocials } from "@/components/twin/EliteSocials";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { brand } from "@/lib/data";
import "../elite.css";

export const metadata: Metadata = {
  title: "Contact · Elite Listings, Bilal Naqsh",
  description:
    "Book a call with Bilal Naqsh: 604-700-7584, bilal@elitelistings.ca, 310 – 638 Broughton Street, Vancouver. Residential, commercial and development across Greater Vancouver.",
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.office)}`;

/**
 * /contact rebuilt in the elite system, adapted from Praxis Leandra Isler (Details id Y0VPNY…): a split hero
 * with an oversized heading and a three-row contact table (office / phone / email, each with an action link and
 * a divider rule) on the left, and Bilal at the marina on the phone on the right. A booking bar closes the hero.
 * Below, the book-a-call form sits beside his own sold board (the proof), then the places to find him.
 */
export default function ContactPage() {
  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      {/* Split hero: contact table left, marina portrait right */}
      <section className="ct sec sec--cream" data-ground="light" aria-labelledby="ct-title">
        <div className="ct__grid">
          <div className="ct__left">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Contact</p>
            <h1 className="ct__hl" id="ct-title" data-reveal-01="lines" data-scroll>Let&rsquo;s <span className="em">talk.</span></h1>
            <p className="ct__lede" data-reveal="up" data-reveal-delay="0.06">
              Tell {brand.realtor.split(" ")[0]} what you are working on. Residential, commercial or development, the first step is one conversation.
            </p>

            <div className="ct__table" data-reveal-group="up">
              <div className="ct__row" data-reveal-item>
                <p className="ct__rowlabel">Office</p>
                <p className="ct__rowval">{brand.officeShort}</p>
                <a className="ct__rowlink" href={mapsHref} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">&#8599;</span></a>
              </div>
              <div className="ct__row" data-reveal-item>
                <p className="ct__rowlabel">Phone</p>
                <p className="ct__rowval">{brand.phone}</p>
                <a className="ct__rowlink" href={brand.phoneHref}>Call now <span aria-hidden="true">&#8599;</span></a>
              </div>
              <div className="ct__row" data-reveal-item>
                <p className="ct__rowlabel">Email</p>
                <p className="ct__rowval">{brand.email}</p>
                <a className="ct__rowlink" href={`mailto:${brand.email}`}>Send email <span aria-hidden="true">&#8599;</span></a>
              </div>
            </div>

            <p className="ct__langs" data-reveal="up">Speaks {brand.languages.join(", ")}.</p>
          </div>

          <div className="ct__media" data-reveal="up" data-reveal-delay="0.1">
            <img src="/images/contact-marina.webp" alt={`${brand.realtor} on a call at the Coal Harbour marina, Vancouver`} loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </div>

        <div className="ct__bar" data-reveal="up">
          <p className="ct__barhl">Rather book a call directly?</p>
          <EliteButton href={brand.phoneHref} variant="primary">Call {brand.phone}</EliteButton>
        </div>
      </section>

      {/* Book a call — the form, on its own */}
      <section className="cbk sec sec--dark" data-ground="dark" aria-labelledby="cbk-title">
        <div className="cbk__inner">
          <div className="eh">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Book a call</p>
            <h2 className="eh__hl" id="cbk-title" data-reveal-01="lines" data-scroll>Start with a <span className="em">conversation.</span></h2>
            <p className="eh__sub" data-reveal="up" data-reveal-delay="0.06">A few details and {brand.realtor.split(" ")[0]} will come back to you, usually the same day.</p>
          </div>
          <EliteContactForm />
        </div>
      </section>

      {/* Where else to find him */}
      <section className="cel sec sec--cream" data-ground="light" aria-labelledby="cel-title">
        <div className="cel__grid">
          <div className="cel__head">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Bilal elsewhere</p>
            <h2 className="eh__hl" id="cel-title" data-reveal-01="lines" data-scroll>Also <span className="em">here.</span></h2>
            <p className="cel__sub" data-reveal="up" data-reveal-delay="0.06">{brand.credential}</p>
          </div>
          <div className="cel__socials" data-reveal="up" data-reveal-delay="0.1">
            <EliteSocials />
          </div>
        </div>
      </section>

      <EliteFooter />
    </main>
  );
}
