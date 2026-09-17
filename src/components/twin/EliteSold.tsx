"use client";

import { proof, lineLabel, type Line } from "@/lib/data";

/**
 * Recently sold — real, confirmed wins (content-pack / proof data), line-tagged. Original card layout
 * (photo, then line / place / result beneath). The only added behaviour is the hover: each card tilts away
 * from the cursor and presses back. No invented prices or figures (BC rules).
 *
 * Defaults render the homepage's all-lines "Recently sold". Line pages pass `line` to show only that line's
 * wins (brief: never blend a commercial deal into residential proof) and their own head copy.
 */
export function EliteSold({
  line,
  eyebrow = "Recently sold",
  titleLead = "Sold, and sold ",
  accent = "right.",
  sub = "A sample of recent results across his lines. Only what is confirmed, nothing inflated.",
}: {
  line?: Line;
  eyebrow?: string;
  titleLead?: string;
  accent?: string;
  sub?: string;
} = {}) {
  const sold = proof.filter((p) => p.status === "Sold" && (!line || p.line === line));

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateX(${(py * 6).toFixed(2)}deg) rotateY(${(px * -7).toFixed(2)}deg) scale(0.965)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; };

  return (
    <section className="sold" aria-labelledby="sold-title" data-ground="light" data-wash="#12100d">
      <div className="sold__head">
        <p className="sold__tag" data-reveal="up"><span className="sold__mk" aria-hidden="true" />{eyebrow}</p>
        <h2 className="sold__hl" id="sold-title" data-reveal-01="lines" data-scroll>{titleLead}<span className="em">{accent}</span></h2>
        <p className="sold__sub" data-reveal="up" data-reveal-delay="0.12">{sub}</p>
      </div>

      <ul className="sold__grid" role="list">
        {sold.map((p, i) => (
          <li key={p.id} className="sold__card" onMouseMove={onMove} onMouseLeave={onLeave}>
            <div className={`sold__media${p.image ? "" : " sold__media--plain"}`} data-reveal="clip" data-reveal-delay={(i * 0.1).toFixed(2)}>
              {p.image
                ? <img src={p.image} alt={p.imageAlt ?? ""} loading="lazy" decoding="async" />
                : <span className="sold__plainmark" aria-hidden="true">Sold.</span>}
              {p.image && <span className="sold__badge">Sold.</span>}
            </div>
            <div className="sold__body" data-reveal="up" data-reveal-delay={(i * 0.1 + 0.12).toFixed(2)}>
              <p className="sold__line">{lineLabel[p.line]}</p>
              <p className="sold__place">{p.kind} in {p.place}</p>
              <p className="sold__result">{p.result}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
