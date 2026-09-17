"use client";

import { useState } from "react";

type QA = { q: string; a: string };

/** First-person voice, elite site only (the shared `questions` in data.ts keeps the old third-person copy for
 * the ink pages). Real answers, including the honest no-MLS-search one. Default set = residential. */
const RESIDENTIAL_FAQ: QA[] = [
  {
    q: "Can I search active MLS® listings here?",
    a: "No. This site shows our own listings, the ones we represent. If you want the wider market, tell us what you’re after and we’ll send you what fits.",
  },
  {
    q: "Do you work in both residential and commercial?",
    a: "Yes, and development. Homes, businesses and commercial space, and sites, each with its own first step.",
  },
  {
    q: "Can landlords get property management support?",
    a: "Yes. We set owners up with Vancouver Rent-It, the team’s management arm, with more than 800 rental properties across Greater Vancouver. We confirm scope and fees once we’ve reviewed the property.",
  },
];

/**
 * FAQ — a single-open accordion sitting right before the contact footer, so it resolves a visitor's last
 * doubts at the point of decision. Smooth height via grid-template-rows 0fr→1fr; one panel open at a time.
 * Cream ground, centred head. Reusable across line pages: pass `items` + head copy; defaults are residential.
 */
export function EliteFaq({
  eyebrow = "Good to know",
  titleLead = "Questions, answered ",
  accent = "straight.",
  items = RESIDENTIAL_FAQ,
}: {
  eyebrow?: string;
  titleLead?: string;
  accent?: string;
  items?: QA[];
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const FAQ = items;

  return (
    <section className="faq sec sec--cream" data-ground="light" aria-labelledby="faq-title">
      <div className="faq__head">
        <p className="faq__tag" data-reveal="up"><span className="faq__mk" aria-hidden="true" />{eyebrow}</p>
        <h2 className="faq__hl" id="faq-title" data-reveal-01="lines" data-scroll>{titleLead}<span className="em">{accent}</span></h2>
      </div>

      <ul className="faq__list" data-reveal="up">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <li className={`faq__item${isOpen ? " is-open" : ""}`} key={item.q}>
              <h3 className="faq__qh">
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="faq__qtext">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true"><i /><i /></span>
                </button>
              </h3>
              <div className="faq__panel" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div className="faq__panelinner"><p className="faq__a">{item.a}</p></div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
