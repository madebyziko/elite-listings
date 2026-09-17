"use client";

import { useState } from "react";
import { brand } from "@/lib/data";
import { EliteButton } from "./EliteButton";

/**
 * Book-a-call form (front-end only, mailto — Ziri wires the real backend). Lifted out of the old footer so
 * it lives on the contact page beside the proof. One line pick, name, a way to reach back, a few words.
 */
const LINES = ["Residential", "Commercial", "Development"] as const;

export function EliteContactForm() {
  const [interest, setInterest] = useState<string>("Residential");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Line: ${interest}\r\nName: ${name}\r\nContact: ${contact}\r\n\r\n${msg}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(`Booking a call — ${interest}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="cform" onSubmit={submit}>
      <fieldset className="cform__field">
        <legend>I&rsquo;m interested in</legend>
        <div className="cform__pills">
          {LINES.map((l) => (
            <button
              type="button"
              key={l}
              className={`cform__pill${interest === l ? " is-on" : ""}`}
              aria-pressed={interest === l}
              onClick={() => setInterest(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="cform__row">
        <label className="cform__input"><span>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        </label>
        <label className="cform__input"><span>Phone or email</span>
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="How to reach you" required />
        </label>
      </div>
      <label className="cform__input"><span>What are you looking for?</span>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="A few words on your move" />
      </label>
      <span className="cform__send"><EliteButton type="submit" variant="primary">Send</EliteButton></span>
    </form>
  );
}
