import { brand } from "@/lib/data";
import { listingTitle, type Listing } from "@/lib/listings";

/**
 * The one conversion element on a listing page (adapted from the ink TourCard): book a viewing of this home
 * with Bilal, or call him. Sticky on desktop. Posts by mail until Ziri wires the backend.
 */
export function EliteTourCard({ l }: { l: Listing }) {
  const subject = `Viewing: ${listingTitle(l)}`;
  return (
    <aside className="ldt" aria-labelledby="tour-title">
      <p className="ldt__flag"><span className="ldt__flagmk" aria-hidden="true" />{l.openHouse ? l.openHouse.when : "Private viewings"}</p>
      <h2 className="ldt__title" id="tour-title">Book a viewing with <span className="em">Bilal.</span></h2>
      <p className="ldt__sub">He is the listing agent and shows this home himself.</p>
      <form className="ldt__form" action={`mailto:${brand.email}?subject=${encodeURIComponent(subject)}`} method="post" encType="text/plain">
        <input type="hidden" name="listing" value={listingTitle(l)} />
        <label className="ldt__field"><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
        <label className="ldt__field"><span>Phone or email</span><input name="reach" required autoComplete="on" placeholder="How to reach you" /></label>
        <label className="ldt__field"><span>When suits you?</span><input name="when" placeholder="Weekday evening, Saturday morning" /></label>
        <button type="submit" className="ldt__submit">Book a viewing</button>
      </form>
      <p className="ldt__call">Or call <a href={brand.phoneHref}>{brand.phone}</a></p>
      <p className="ldt__cred">{brand.credential}</p>
    </aside>
  );
}
