"use client";

import type { ReactNode } from "react";

/**
 * Socials as a row of icon + name tiles (Rayan: "present them like the attachment, name beside the logo").
 * Every destination is real and verified live (data.ts / content-pack.md) — no dead icons. Monochrome glyphs
 * ride on currentColor so the same component sits on the dark footer and the contact page without restyling;
 * the whole pill fills bordeaux on hover. Instagram and LinkedIn use their marks; REW and realtor.ca, which
 * have no clean inline glyph, use a small lettered tile instead.
 */
export type SocialItem = { label: string; href: string; sub?: string; icon: ReactNode };

const IgIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.38-.32-1.71-.17-.43-.37-.74-.69-1.06-.32-.32-.63-.52-1.06-.69-.33-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 110 10.6 5.3 5.3 0 010-10.6zm0 1.62a3.68 3.68 0 100 7.36 3.68 3.68 0 000-7.36zm5.48-.16a1.24 1.24 0 110 2.48 1.24 1.24 0 010-2.48z" /></svg>
);
const InIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" /></svg>
);

export const SOCIALS: SocialItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/bilal.naqsh/", sub: "@bilal.naqsh", icon: IgIcon },
  { label: "LinkedIn", href: "https://ca.linkedin.com/in/bilalnaqsh", sub: "Bilal Naqsh", icon: InIcon },
  { label: "REW", href: "https://www.rew.ca/agents/276778/bilal-naqsh", sub: "Listings & reviews", icon: <span className="esoc__mono">rew</span> },
  { label: "realtor.ca", href: "https://www.realtor.ca/agent/2174273/bilal-naqsh-310-638-broughton-street-vancouver-british-columbia-v6g3k3", sub: "Agent profile", icon: <span className="esoc__mono">R</span> },
];

export function EliteSocials({ items = SOCIALS, className = "" }: { items?: SocialItem[]; className?: string }) {
  return (
    <ul className={`esoc${className ? " " + className : ""}`}>
      {items.map((s) => (
        <li key={s.label}>
          <a className="esoc__item" href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label}${s.sub ? " — " + s.sub : ""}`}>
            <span className="esoc__icon" aria-hidden="true">{s.icon}</span>
            <span className="esoc__txt">
              <span className="esoc__label">{s.label}</span>
              {s.sub && <span className="esoc__sub">{s.sub}</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
