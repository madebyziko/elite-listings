import { reviewHref } from "@/lib/data";

/**
 * The close — an emotional CTA + real trust signals before the footer. Cream ground (alternates against the
 * dark About above and the dark footer below). Reviews are handled honestly: a link to his verified REW
 * profile rather than fabricated testimonials (the brief forbids invented reviews).
 */
export function EliteClose() {
  return (
    <section className="cl" aria-labelledby="cl-title" data-ground="dark">
      <div className="cl__inner">
        <p className="cl__tag" data-reveal="up"><span className="cl__mk" aria-hidden="true" />Let&rsquo;s talk</p>
        <h2 className="cl__hl" id="cl-title" data-reveal="mask" data-reveal-delay="0.06"><span className="ln">Ready to make <span className="em">your move?</span></span></h2>
        <p className="cl__sub" data-reveal="up" data-reveal-delay="0.12">A short call is the fastest way to a straight answer. No pressure, no runaround. The form is right below.</p>
        <div className="cl__cta" data-reveal="up" data-reveal-delay="0.18">
          <a className="cl__jump" href="#contact">Start the conversation <span className="cl__jumparw" aria-hidden="true">&darr;</span></a>
          <a className="cl__reviews" href={reviewHref} target="_blank" rel="noreferrer">Read verified reviews on REW <span aria-hidden="true">&rarr;</span></a>
        </div>
        <ul className="cl__trust" role="list" data-reveal-group="up">
          <li data-reveal-item>Speaks English, Farsi &amp; Hindi</li>
          <li data-reveal-item>University of British Columbia</li>
          <li data-reveal-item>Vancouver Elite Team &middot; Coldwell Banker</li>
        </ul>
      </div>
    </section>
  );
}
