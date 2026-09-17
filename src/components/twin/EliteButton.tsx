import type { ReactNode } from "react";

/**
 * Site-wide CTA buttons for actions that lead somewhere (book a call, view listing, send, browse).
 * - variant="primary": VWLAB "smooth transition" pill (details id Hit2e…) — a SOLID accent pill (bordeaux with
 *   a cream label on light grounds; inverts on dark) whose colours flip on hover: the opposite colour WIPES UP
 *   to fill it while the label rolls vertically in sync (the resting label exits the top as a duplicate rides
 *   the fill up from below). Ground-adaptive via --eb-line / --eb-on. Solid weight keeps it clearly primary
 *   against the faint ghost.
 * - variant="ghost": secondary whose label slides up to a duplicate on hover (button-01 adaptation), with a
 *   hairline pill border for affordance; inherits the ground's text colour.
 * Renders an <a> when href is given, otherwise a <button> (e.g. the footer submit).
 */
export function EliteButton({
  children,
  href,
  variant = "primary",
  type = "button",
  className,
  ariaLabel,
  tabIndex,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
}) {
  const cls = `eb eb--${variant}${className ? ` ${className}` : ""}`;
  const content =
    variant === "primary" ? (
      <>
        <span className="eb__fill" aria-hidden="true" />
        <span className="eb__roll">
          <span className="eb__t eb__t1">{children}</span>
          <span className="eb__t eb__t2" aria-hidden="true">{children}</span>
        </span>
      </>
    ) : (
      <span className="eb__slide"><span className="eb__txt">{children}</span></span>
    );

  return href ? (
    <a className={cls} href={href} aria-label={ariaLabel} tabIndex={tabIndex}>{content}</a>
  ) : (
    <button className={cls} type={type} aria-label={ariaLabel} tabIndex={tabIndex}>{content}</button>
  );
}
