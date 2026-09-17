import localFont from "next/font/local";

// Elite Listings type system (two families):
//   Söhne — the sans: hero/section display and all body + UI.
//   PP Editorial New — the serif: the italic accent words ("smart." / "strong." / "are you?") and the wordmark.
// Söhne files are currently the Test (trial) cut; drop the licensed files in at the same paths for production.
export const sohne = localFont({
  src: [
    { path: "./sohne/Sohne-Buch.otf", weight: "400", style: "normal" },
    { path: "./sohne/Sohne-Kraftig.otf", weight: "500", style: "normal" },
    { path: "./sohne/Sohne-Halbfett.otf", weight: "600", style: "normal" },
    { path: "./sohne/Sohne-Fett.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sohne",
  display: "swap",
});

export const editorial = localFont({
  src: [
    { path: "./editorial/PPEditorialNew-Regular.otf", weight: "400", style: "normal" },
    { path: "./editorial/PPEditorialNew-Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
