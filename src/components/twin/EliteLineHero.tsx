import type { Photo } from "@/lib/data";
import { EliteButton } from "./EliteButton";

type CTA = { label: string; href: string };
type Video = { src: string; poster: string };

/**
 * Line-page hero (Residential / Commercial / Development), in the elite system. Dark ground so the fixed nav
 * reads cream over it. Spare by design (brief: no overstuffed hero): eyebrow, a split headline with a serif
 * accent on the last line, one supporting line, a matched primary CTA + one secondary, and the line's media.
 * Reused across all three line pages; the copy and CTAs come in as props.
 *
 * Media: a still `photo`, or a contained "living" `video` (muted autoplay loop) when one is supplied. The
 * video is kept in the same contained, rounded panel (the home hero owns the full-bleed scroll-film), shown at
 * its native 16:9 so the wide establishing shot is never cropped. Under reduced motion the video is hidden by
 * CSS and its poster still shows in its place, so nothing autoplays for those visitors.
 */
export function EliteLineHero({
  eyebrow,
  lead,
  accent,
  sub,
  primary,
  secondary,
  photo,
  video,
}: {
  eyebrow: string;
  lead: string[];
  accent: string;
  sub: string;
  primary: CTA;
  secondary?: CTA;
  photo: Photo;
  video?: Video;
}) {
  return (
    <section className="rlh" data-ground="dark" aria-labelledby="rlh-title">
      <div className="rlh__grid">
        <div className="rlh__text">
          <p className="rlh__eyebrow" data-reveal="up"><span className="rlh__mk" aria-hidden="true" />{eyebrow}</p>
          <h1 className="rlh__hl" id="rlh-title" data-reveal-01="lines">
            {lead.map((l, i) => (<span className="ln" key={i}>{l}</span>))}
            <span className="ln"><span className="em">{accent}</span></span>
          </h1>
          <p className="rlh__sub" data-reveal="up" data-reveal-delay="0.14">{sub}</p>
          <div className="rlh__cta" data-reveal="up" data-reveal-delay="0.2">
            <EliteButton href={primary.href} variant="primary">{primary.label}</EliteButton>
            {secondary && <EliteButton href={secondary.href} variant="ghost">{secondary.label}</EliteButton>}
          </div>
        </div>
        <figure className={`rlh__media${video ? " rlh__media--video" : ""}`} data-reveal="clip">
          {video ? (
            <>
              <video
                className="rlh__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={photo.alt}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <img className="rlh__vidfallback" src={video.poster} alt={photo.alt} decoding="async" />
            </>
          ) : (
            <img src={photo.src} alt={photo.alt} decoding="async" />
          )}
        </figure>
      </div>
    </section>
  );
}
