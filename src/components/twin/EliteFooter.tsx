"use client";

import { useState } from "react";
import { brand, profiles } from "@/lib/data";
import { EliteButton } from "./EliteButton";

/**
 * Footer — the monochrome finale (Rejouice), rebuilt so nothing floats in dead space: the left rail stacks
 * contact, explore and socials to fill the height beside the form; a baseline row carries the credential and
 * copyright; the oversized wordmark rises letter by letter as it docks. Dual-text hover on the nav links.
 * The form is front-end only (mailto); Ziri wires the real backend.
 */
const LINES = ["Residential", "Commercial", "Development"] as const;
const EXPLORE = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Development", href: "/development" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** A link whose label swaps to a duplicate rising from below on hover (Rejouice/Seasats move). */
function SwapLink({ href, children, external }: { href: string; children: string; external?: boolean }) {
  const ext = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a className="ft__swap" href={href} {...ext}>
      <span className="ft__swap-in">
        <span className="ft__swap-a">{children}{external && <span aria-hidden="true"> &#8599;</span>}</span>
        <span className="ft__swap-b" aria-hidden="true">{children}{external && <span> &#8599;</span>}</span>
      </span>
    </a>
  );
}

export function EliteFooter() {
  const [interest, setInterest] = useState<string>("Residential");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Line: ${interest}\r\nName: ${name}\r\nContact: ${contact}\r\n\r\n${msg}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(`Booking a call — ${interest}`)}&body=${encodeURIComponent(body)}`;
  };

  const WORDMARK = "Elite Listings";

  return (
    <footer id="contact" className="ft" data-ground="dark" data-wash="#F6F1E9">
      <div className="ft__top">
        <div className="ft__left">
          <div className="ft__contact">
            <p className="ft__eyebrow" data-reveal="up">Get in touch</p>
            <a className="ft__big" href={brand.phoneHref} data-reveal="up" data-reveal-delay="0.04">{brand.phone}</a>
            <a className="ft__big" href={`mailto:${brand.email}`} data-reveal="up" data-reveal-delay="0.08">{brand.email}</a>
            <p className="ft__addr" data-reveal="up" data-reveal-delay="0.12">{brand.officeShort}</p>
          </div>

          <nav className="ft__explore" aria-label="Explore">
            <p className="ft__eyebrow" data-reveal="up">Explore</p>
            <div className="ft__explorelist" data-reveal-group="up">
              {EXPLORE.map((x) => (<span data-reveal-item key={x.label}><SwapLink href={x.href}>{x.label}</SwapLink></span>))}
            </div>
          </nav>

          <div className="ft__socials">
            <p className="ft__eyebrow" data-reveal="up">Follow</p>
            <div className="ft__sociallist" data-reveal-group="up">
              <span data-reveal-item><SwapLink href={`https://www.instagram.com/${brand.instagram}/`} external>Instagram</SwapLink></span>
              <span data-reveal-item><SwapLink href={profiles[1].href} external>LinkedIn</SwapLink></span>
              <span data-reveal-item><SwapLink href={profiles[2].href} external>REW</SwapLink></span>
            </div>
          </div>
        </div>

        <form className="ft__form" onSubmit={submit}>
          <p className="ft__formtitle" data-reveal="up">Book a call with <span className="em">Bilal.</span></p>
          <fieldset className="ft__field" data-reveal="up" data-reveal-delay="0.06">
            <legend>I&rsquo;m interested in</legend>
            <div className="ft__pills">
              {LINES.map((l) => (
                <button
                  type="button"
                  key={l}
                  className={`ft__pill${interest === l ? " is-on" : ""}`}
                  aria-pressed={interest === l}
                  onClick={() => setInterest(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="ft__row">
            <label className="ft__input" data-reveal="up" data-reveal-delay="0.1"><span>Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </label>
            <label className="ft__input" data-reveal="up" data-reveal-delay="0.14"><span>Phone or email</span>
              <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="How to reach you" required />
            </label>
          </div>
          <label className="ft__input" data-reveal="up" data-reveal-delay="0.18"><span>What are you looking for?</span>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="A few words on your move" />
          </label>
          <span className="ft__send" data-reveal="up" data-reveal-delay="0.22"><EliteButton type="submit" variant="primary">Send</EliteButton></span>
        </form>
      </div>

      <div className="ft__base" data-reveal="up">
        <p>{brand.credential}</p>
        <p>&copy; {new Date().getFullYear()} {brand.name} &middot; {brand.domain}</p>
      </div>

      <div className="ft__wordmark" data-reveal="letters" role="img" aria-label={WORDMARK}>
        {WORDMARK.split("").map((ch, i) => (
          <span className="ltr" key={i} aria-hidden="true">{ch === " " ? " " : ch}</span>
        ))}
      </div>
    </footer>
  );
}
