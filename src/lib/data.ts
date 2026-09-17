// Single source of truth for content. Everything here is real and sourced (content-pack.md, 2026-09-12)
// or carries `confirm: true` and renders with a visible marker until Bilal's records verify it.
// Team figures belong to the Vancouver Elite Team and are attributed to the team wherever they appear.
// Sample photographs carry `sample: true` and a caption. Nothing is invented.

export type Line = "residential" | "commercial" | "development";

export const brand = {
  name: "Elite Listings",
  domain: "elitelistings.ca",
  realtor: "Bilal Naqsh",
  role: "Real Estate Advisor",
  team: "Vancouver Elite Team",
  brokerage: "Coldwell Banker Prestige Realty",
  /** Locked lockup, middots. */
  credential: "Bilal Naqsh · Vancouver Elite Team · Coldwell Banker Prestige Realty",
  /** Team and brokerage lockup without his name. Not shown on the hero (director, 2026-09-12); kept for the footer and About. */
  eyebrow: "Vancouver Elite Team · Coldwell Banker Prestige Realty",
  phone: "604-700-7584",
  phoneHref: "tel:+16047007584",
  officePhone: "604-408-0008",
  officePhoneHref: "tel:+16044080008",
  email: "bilal@elitelistings.ca",
  instagram: "bilal.naqsh",
  office: "#310 – 638 Broughton Street, Vancouver, BC V6G 3K3",
  officeShort: "310 – 638 Broughton Street, Vancouver",
  languages: ["English", "Farsi", "Hindi"],
  market: "Greater Vancouver",
  focusAreas: ["Yaletown", "West Vancouver", "Burnaby"],
  education: "University of British Columbia",
  /** His own words, verbatim (LinkedIn, Instagram). */
  voice: {
    positioning: "Helping clients buy smart and sell strong in Greater Vancouver",
    triad: "Trusted, Strategic, Local",
    promise: "Providing quality services because you deserve it",
  },
};

/** Real destinations, verified live. No dead icons anywhere. */
export const profiles = [
  { label: "Instagram", handle: "@bilal.naqsh", href: "https://www.instagram.com/bilal.naqsh/" },
  { label: "LinkedIn", handle: "bilalnaqsh", href: "https://ca.linkedin.com/in/bilalnaqsh" },
  { label: "REW", handle: "Agent profile and listings", href: "https://www.rew.ca/agents/276778/bilal-naqsh" },
  {
    label: "Coldwell Banker Prestige Realty",
    handle: "Agent profile",
    href: "https://www.coldwellbankerprestigerealty.ca/agents/2000597/Bilal+Naqsh",
  },
  {
    label: "realtor.ca",
    handle: "Agent 2174273",
    href: "https://www.realtor.ca/agent/2174273/bilal-naqsh-310-638-broughton-street-vancouver-british-columbia-v6g3k3",
  },
];

export const nav = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Development", href: "/development" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Photo = { src: string; alt: string; sample?: boolean; credit?: string };

export const lines: Record<
  Line,
  {
    key: Line;
    label: string;
    actor: string;
    promise: string;
    cta: string;
    ctaHref: string;
    photo: Photo;
  }
> = {
  residential: {
    key: "residential",
    label: "Residential",
    actor: "Buying or selling a home",
    promise: "Condos, townhomes and houses across Greater Vancouver, handled personally from first showing to keys.",
    cta: "Book a call with Bilal",
    ctaHref: "/residential#contact",
    photo: {
      src: "/images/listings/hedley-burnaby.jpg",
      alt: "7626 Hedley Avenue, Burnaby: a two-storey house with a stone walk and clipped hedges",
    },
  },
  commercial: {
    key: "commercial",
    label: "Commercial",
    actor: "Buying or selling a business or commercial space",
    promise: "Restaurants, retail, convenience, gas and franchise deals, kept confidential until you say otherwise.",
    cta: "Discuss a deal, confidentially",
    ctaHref: "/commercial#contact",
    photo: {
      src: "/images/sample/v2-commercial-restaurant.jpg",
      alt: "A restaurant at golden hour, tables set along the window",
      sample: true,
    },
  },
  development: {
    key: "development",
    label: "Development",
    actor: "Holding land or planning a project",
    promise: "Site sourcing, early feasibility and presales for landowners and small to mid developers. Numbers first.",
    cta: "Send me the site",
    ctaHref: "/development#contact",
    photo: {
      src: "/images/sample/v2-development-cranes.jpg",
      alt: "Tower cranes over a site at blue hour",
      sample: true,
    },
  },
};

export const listingsHref = "/listings";

export type Proof = {
  id: string;
  line: Line;
  status: "Sold" | "Listed" | "Presale";
  kind: string; // the property, so it never reads as "the whole district": "A condo", "A restaurant"
  place: string; // the neighbourhood
  result: string; // the outcome that does the converting
  detail?: string; // optional extra line; consumed by the legacy ink "/" proof rows
  image?: string;
  imageAlt?: string;
  confirm?: string; // only for a genuinely open item; renders a visible marker
};

// His own wins, from his posts. Short and real; he adds rows as he confirms them.
export const proof: Proof[] = [
  {
    id: "north-delta",
    line: "residential",
    status: "Sold",
    kind: "A home",
    place: "North Delta",
    result: "Bought $110,000 under asking",
    // Real photo from Bilal's own "$110K below asking" post, Instagram chrome cropped off.
    image: "/images/listing-north-delta.jpg",
    imageAlt: "Living room of the North Delta home Bilal's clients bought below asking",
  },
  {
    id: "olympic-village",
    line: "residential",
    status: "Sold",
    kind: "A condo",
    place: "Olympic Village",
    result: "Sold at full asking",
    image: "/images/listing-olympic-village.jpg",
    imageAlt: "Olympic Village condo building at dusk",
  },
  {
    id: "downtown-restaurant",
    line: "commercial",
    status: "Sold",
    kind: "A restaurant",
    place: "Downtown Vancouver",
    result: "Sold in 29 days",
    image: "/images/listing-downtown-restaurant.jpg",
    imageAlt: "Interior of the downtown restaurant, sold by Bilal",
  },
];

/** Institutional scale behind him, stated as the team's and the brokerage's. No other individuals are named on his site. */
export const teamProof = [
  { who: "Coldwell Banker Prestige Realty", what: "A brokerage of more than 80 Realtors." },
  { who: "Vancouver Rent-It", what: "The team's management arm, with more than 800 rental properties across Greater Vancouver." },
];

export const badges = [
  { name: "Vancouver Elite Team", note: "Real Estate Advisor", href: "https://vancouverelites.ca/aboutus" },
  { name: "Coldwell Banker Prestige Realty", note: "Brokerage", href: profiles[3].href },
  { name: "University of British Columbia", note: "Education", href: "https://ca.linkedin.com/in/bilalnaqsh" },
];

export const reviewHref = "https://www.rew.ca/agents/276778/bilal-naqsh";

export const lineLabel: Record<Line, string> = {
  residential: "Residential",
  commercial: "Commercial",
  development: "Development",
};

/** Areas he works, from his own site. */
export const areas = [
  "Yaletown",
  "Coal Harbour",
  "Downtown Vancouver",
  "Kitsilano",
  "Mount Pleasant",
  "Burnaby",
  "Surrey",
  "North Vancouver",
  "Langley",
  "Delta",
];

/** The questions his own site asks, answered straight. */
export const questions = [
  {
    q: "Can I search active MLS\u00ae listings here?",
    a: "No. This site shows Bilal's own listings, the ones he represents. If you want the wider market, tell him what you are after and he will send you what fits.",
  },
  {
    q: "Does Bilal work in both residential and commercial?",
    a: "Yes, and development. Homes, businesses and commercial space, and sites, each with its own first step.",
  },
  {
    q: "Can landlords get property management support?",
    a: "Yes. Owners can be set up with Vancouver Rent-It, the team's management arm, with more than 800 rental properties across Greater Vancouver. Scope and fees are confirmed once the property has been reviewed.",
  },
];

/** What each line covers, in his scope, from his own site. Service descriptions, not claims. */
export const scope = {
  residential: {
    selling: [
      "A walk-through of the home and what buyers in the area are paying now",
      "A price, a prep plan and a launch date you agree on",
      "Photography, listing and showings, handled personally",
      "Offers, negotiation and the close",
    ],
    buying: [
      "A short call on what you want and what it costs today",
      "Showings, on our listings and across the market",
      "Offer strategy, subjects and the close",
      "Keys, and the people you will need after",
    ],
    owners: [
      { name: "Rental marketing", what: "Positioning, photography, showings and qualified tenant outreach." },
      { name: "Tenant placement", what: "Applications, screening, references and lease preparation." },
      { name: "Rent and reporting", what: "Collection, owner updates and organized reporting on an agreed plan." },
      { name: "Maintenance coordination", what: "Repair requests, vendor access and owner approvals." },
      { name: "Inspections and transitions", what: "Move-in, move-out and periodic condition reports with clear documentation." },
    ],
  },
  commercial: {
    blocks: [
      {
        name: "Businesses for sale",
        what: "Restaurants and caf\u00e9s, convenience and grocery, liquor, gas stations, franchises, retail, salons and wellness, fitness, medical and dental, pharmacies, automotive, daycares, hotels and motels, laundromats, professional services, manufacturing and industrial operations.",
      },
      {
        name: "Commercial real estate",
        what: "Retail, office, medical, industrial, warehouse, mixed-use, multifamily and income-producing properties, and land assemblies.",
      },
      {
        name: "Leasing and locations",
        what: "Tenant and landlord representation, site selection, renewals, assignments, new leases and expansion planning.",
      },
      {
        name: "Asset and share sales",
        what: "Asset purchases, share purchases, equipment, goodwill, inventory and transaction structures, reviewed with your lawyer and accountant.",
      },
    ],
    process: [
      { name: "Define the opportunity", what: "Use, budget, financing, return targets and deal structure." },
      { name: "Review the full picture", what: "Property, lease, financials, assets, permits, zoning and operational risk." },
      { name: "Structure and negotiate", what: "Price, conditions, due diligence, landlord approval and the closing timeline." },
      { name: "Coordinate the specialists", what: "Legal, accounting, lending, inspection and whoever else the deal needs." },
    ],
  },
  development: {
    process: [
      { name: "Find the site", what: "On-market, off-market, assemblies, redevelopment and value-add." },
      { name: "Test the plan", what: "Zoning, density, use, setbacks, approvals, timeline and highest-and-best-use." },
      { name: "Build the budget", what: "Land, acquisition, hard costs, soft costs, financing, contingency and selling costs." },
      { name: "Measure the return", what: "Projected revenue, all-in cost, margin, return on cost and the scenarios that break it." },
    ],
  },
};

/**
 * About — the proof numbers behind him. Everything here is verifiable:
 *  - lines/languages are his own facts;
 *  - the 80+/800+ figures belong to the brokerage / the team's management arm and are labelled as such.
 * `count` drives the scroll count-up; `suffix` keeps the "+".
 */
export const aboutStats: { count: number; prefix?: string; suffix?: string; label: string }[] = [
  { count: 3, label: "Service lines, handled personally" },
  { count: 3, label: "Languages he works in" },
  { count: 80, suffix: "+", label: "Realtors at his brokerage" },
  { count: 800, suffix: "+", label: "Rentals managed by the team’s arm" },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string; // context under the name, e.g. "Seller · Burnaby"
  line: Line;
  rating: number; // out of 5. ⚠ set from the real review when imported.
  /** The metric trio that does the converting. ⚠ TO CONFIRM against real client data before ship. */
  metrics: { value: string; label: string }[];
  /** True until Bilal supplies the verified quote, name, permission and real numbers. */
  placeholder?: boolean;
};

/**
 * ⚠ PLACEHOLDER TESTIMONIALS — structure + motion only. Every quote, name, role and metric below is a
 * visible placeholder, NOT a real review. Rayan imports Bilal's verified testimonials (with the client's
 * permission and real figures) in their place. Do not ship these as-is. BC/RECBC: no invented proof.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "[Verified client quote goes here] — a seller describing how Bilal priced, prepared and closed the sale. Real wording supplied by the client.",
    name: "Client name",
    role: "Seller · Residential",
    line: "residential",
    rating: 5,
    metrics: [
      { value: "—", label: "Result" },
      { value: "—", label: "Days on market" },
      { value: "—", label: "Vs. asking" },
    ],
    placeholder: true,
  },
  {
    id: "t2",
    quote: "[Verified client quote goes here] — a buyer on the negotiation and the number Bilal got them to. Real wording supplied by the client.",
    name: "Client name",
    role: "Buyer · Residential",
    line: "residential",
    rating: 5,
    metrics: [
      { value: "—", label: "Below asking" },
      { value: "—", label: "Offers beaten" },
      { value: "—", label: "Neighbourhood" },
    ],
    placeholder: true,
  },
  {
    id: "t3",
    quote: "[Verified client quote goes here] — a business owner on a confidential commercial sale. Real wording supplied by the client.",
    name: "Client name",
    role: "Owner · Commercial",
    line: "commercial",
    rating: 5,
    metrics: [
      { value: "—", label: "Sale type" },
      { value: "—", label: "Days to close" },
      { value: "—", label: "Confidential" },
    ],
    placeholder: true,
  },
  {
    id: "t4",
    quote: "[Verified client quote goes here] — a landowner or developer on feasibility and the deal. Real wording supplied by the client.",
    name: "Client name",
    role: "Landowner · Development",
    line: "development",
    rating: 5,
    metrics: [
      { value: "—", label: "Site" },
      { value: "—", label: "Feasibility" },
      { value: "—", label: "Outcome" },
    ],
    placeholder: true,
  },
];
