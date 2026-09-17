// His active listings, curated, append-friendly. Source: REW listing pages for his MLS® listings, 2026-09-12.
// Bilal Naqsh is the primary agent on each. Remarks are the MLS® public remarks, trimmed only of the embedded
// open-house and "call today" lines (the open house is rendered as its own flag, the call is our own action).
// Photos are the listing photographs (12 of each gallery saved locally); rights as the listing agent's own.

export type Listing = {
  slug: string;
  address: string;
  unit?: string;
  city: string;
  neighbourhood: string;
  postal: string;
  price: number;
  type: "House" | "Townhouse" | "Condo";
  beds: number;
  baths: number;
  halfBaths?: number;
  sqft: number;
  lot?: string;
  yearBuilt: number;
  mls: string;
  openHouse?: { label: string; when: string };
  status: "Active";
  headline: string; // our one-line summary, drawn from the remarks
  remarks: string;
  facts: [string, string][];
  building?: { name: string; note: string; facts: [string, string][] };
  schools: { name: string; kind: string; grades: string; distanceKm: number; catchment?: boolean }[];
  photos: number; // count of /images/listings/<slug>/NN.jpg
  photoAlts: string[];
  rew: string;
};

export const listings: Listing[] = [
  {
    slug: "hedley-burnaby",
    address: "7626 Hedley Avenue",
    city: "Burnaby",
    neighbourhood: "South Slope",
    postal: "V5E 2R3",
    price: 2666000,
    type: "House",
    beds: 7,
    baths: 5,
    sqft: 3967,
    lot: "51 × 120 ft lot",
    yearBuilt: 2015,
    mls: "R3152336",
    openHouse: { label: "Open house Sunday", when: "Sunday, September 13, 2 to 4 pm" },
    status: "Active",
    headline: "A hand-built three-level home backing onto Ron McLean Park, with a legal two-bedroom suite and a one-bedroom mortgage helper.",
    remarks:
      "Stunning, exquisite and hand-crafted masterpiece blending timeless elegance with modern luxury. This exceptional 3,967 sq ft three-level residence offers 7 bedrooms, 5 bathrooms, a legal 2-bedroom suite, and a 1-bedroom mortgage helper. Thoughtfully designed with an open-concept layout, it features a gourmet chef's and wok kitchen, quartz countertops, pantry, elegant family room with custom built-ins, and soaring 12-foot ceilings. Premium features include radiant in-floor heating, air conditioning, HRV, and security cameras. Enjoy a covered patio overlooking a private backyard backing onto Ron McLean Park. Ideally located near Burnaby South Secondary, Clinton Elementary, Highgate Village, SkyTrain, Byrne Creek trails, restaurants, and golf.",
    facts: [
      ["Property type", "House"],
      ["Bedrooms", "7"],
      ["Full bathrooms", "5"],
      ["Floor area", "3,967 sq ft"],
      ["Lot size", "51 ft × 120 ft (6,120 sq ft)"],
      ["Year built", "2015"],
      ["Title", "Freehold, non-strata"],
      ["Heating", "Natural gas, hot water, radiant"],
      ["Cooling", "Central air conditioning"],
      ["Basement", "Finished"],
      ["Parking", "5 spaces, double garage, lane access"],
      ["Features", "Central vacuum, in-unit laundry, shopping nearby"],
      ["Appliances", "Dishwasher, refrigerator, stove, washer and dryer"],
      ["Gross taxes (2025)", "$8,495"],
    ],
    schools: [
      { name: "Clinton School", kind: "Public", grades: "Pre-K to 7", distanceKm: 0.87, catchment: true },
      { name: "Burnaby South Secondary School", kind: "Public", grades: "8 to 12", distanceKm: 1.31, catchment: true },
      { name: "St Francis de Sales School", kind: "Independent", grades: "K to 7", distanceKm: 0.65 },
    ],
    photos: 12,
    photoAlts: [
      "Front of the house: two storeys, stone walk, clipped hedges",
      "Exterior detail",
      "Living space",
      "Kitchen",
      "Kitchen detail",
      "Dining",
      "Family room",
      "Bedroom",
      "Bathroom",
      "Suite",
      "Covered patio",
      "Backyard toward Ron McLean Park",
    ],
    rew: "https://www.rew.ca/properties/7626-hedley-avenue-burnaby-bc",
  },
  {
    slug: "155a-surrey",
    address: "10238 155A Street",
    unit: "3",
    city: "Surrey",
    neighbourhood: "Guildford",
    postal: "V3R 0V8",
    price: 979000,
    type: "Townhouse",
    beds: 4,
    baths: 3,
    halfBaths: 1,
    sqft: 2017,
    yearBuilt: 1993,
    mls: "R3127844",
    status: "Active",
    headline: "A corner end-unit townhome by Polygon with a refreshed chef's kitchen, a lower-level two-bedroom suite and a double side-by-side garage.",
    remarks:
      "Highly desirable four-bedroom, three-and-a-half-bath Guildford corner end unit built by Polygon Homes. This executive townhome offers over 2,000 sq ft with a fully integrated smart system including lighting and garburator, rich laminate flooring, and generous living spaces filled with natural light. The beautifully refreshed chef's kitchen features sleek stainless steel appliances, quartz countertops, a modern tiled backsplash, and overlooks a large balcony. Spacious upper bedrooms include updated spa-inspired en suites, while the lower level two-bedroom, one-bath is ideal for teens, guests, or in-laws with flexible living space and backyard access. Rare double side-by-side garage with driveway parking. Steps to Harold Bishop Elementary, Guildford Town Centre, parks, transit and Highway 1.",
    facts: [
      ["Property type", "Townhouse"],
      ["Bedrooms", "4"],
      ["Bathrooms", "3 full, 1 half"],
      ["Floor area", "2,017 sq ft"],
      ["Year built", "1993"],
      ["Title", "Freehold strata"],
      ["Strata fee", "$532 a month"],
      ["Heating", "Forced air, natural gas"],
      ["Basement", "Finished"],
      ["Parking", "4 spaces, double garage, guest and additional parking"],
      ["Features", "In-unit laundry"],
      ["Amenities", "Hot water, grounds maintenance, management, recreation facilities, snow removal, trash"],
      ["Gross taxes (2026)", "$3,790"],
    ],
    building: {
      name: "Chestnut Lane",
      note: "A 64-unit townhouse complex in Guildford, two storeys, built 1994.",
      facts: [
        ["Units", "64"],
        ["Floors", "2"],
        ["Built", "1994"],
      ],
    },
    schools: [
      { name: "Harold Bishop Elementary School", kind: "Public", grades: "K to 7", distanceKm: 0.39, catchment: true },
      { name: "Johnston Heights Secondary School", kind: "Public", grades: "8 to 12", distanceKm: 0.89, catchment: true },
      { name: "Mountainview Montessori School", kind: "Public", grades: "K to 7", distanceKm: 1.07 },
    ],
    photos: 12,
    photoAlts: [
      "Front of the townhouse: double garage under mature trees",
      "Exterior",
      "Living room",
      "Kitchen with stainless appliances and quartz counters",
      "Kitchen detail",
      "Dining",
      "Balcony",
      "Primary bedroom",
      "En suite",
      "Lower-level suite",
      "Backyard",
      "Garage",
    ],
    rew: "https://www.rew.ca/properties/3-10238-155a-street-surrey-bc",
  },
  {
    slug: "knight-vancouver",
    address: "4028 Knight Street",
    unit: "609",
    city: "Vancouver",
    neighbourhood: "Knight",
    postal: "V5N 5Y8",
    price: 699900,
    type: "Condo",
    beds: 2,
    baths: 2,
    sqft: 925,
    yearBuilt: 2008,
    mls: "R3149039",
    status: "Active",
    headline: "A two-bedroom corner home at King Edward Village with 180-degree city and North Shore views and two oversized patios.",
    remarks:
      "Priced below assessment and ready to sell. Rarely available at King Edward Village, this spacious two-bedroom, two-bathroom home offers over 900 sq ft of thoughtfully designed living space with spectacular 180-degree city and North Shore mountain views from every room. Enjoy seamless indoor-outdoor living with two oversized patios totalling over 200 sq ft, perfect for relaxing or entertaining. The open-concept layout features granite countertops, in-suite laundry, and generous living and dining areas. Includes one secure parking stall and a big storage locker on the same floor. Well-managed concrete building with low maintenance fees, fitness centre, party room, and bike storage. Steps to Save-On-Foods, Vancouver Public Library, cafés, restaurants, transit, and everyday essentials.",
    facts: [
      ["Property type", "Apartment"],
      ["Bedrooms", "2"],
      ["Full bathrooms", "2"],
      ["Floor area", "925 sq ft"],
      ["Year built", "2008"],
      ["Title", "Freehold strata"],
      ["Strata fee", "$567 a month"],
      ["Heating", "Electric baseboard"],
      ["Parking", "1 underground stall, guest parking"],
      ["Features", "Elevator, in-unit laundry, storage locker, shopping nearby"],
      ["Amenities", "Bike room, caretaker, exercise centre, hot water, grounds maintenance, recreation facilities, snow removal"],
      ["Gross taxes (2025)", "$2,650"],
    ],
    building: {
      name: "King Edward Village",
      note: "A seven-storey building and a twelve-storey tower joined by a sky bridge, over a grocery store, banks and the public library. Built 2008, 400 homes.",
      facts: [
        ["Units", "400"],
        ["Floors", "17"],
        ["Built", "2008"],
      ],
    },
    schools: [
      { name: "Lord Selkirk School", kind: "Public", grades: "Pre-K to 7", distanceKm: 0.52, catchment: true },
      { name: "Lord Selkirk Annex", kind: "Public", grades: "K to 4", distanceKm: 0.53, catchment: true },
      { name: "Gladstone Secondary School", kind: "Public", grades: "8 to 12", distanceKm: 1.05, catchment: true },
    ],
    photos: 12,
    photoAlts: [
      "King Edward Village: the brick mid-rise over the grocery store, trees along Knight Street",
      "Building exterior",
      "Living room with the view",
      "Kitchen with granite counters",
      "Dining",
      "Patio with city view",
      "Second patio",
      "Primary bedroom",
      "Bathroom",
      "Second bedroom",
      "View toward the North Shore",
      "Amenities",
    ],
    rew: "https://www.rew.ca/properties/609-4028-knight-street-vancouver-bc",
  },
];

export const listingBySlug = (slug: string) => listings.find((l) => l.slug === slug);
export const listingPhoto = (l: Listing, i: number) => `/images/listings/${l.slug}/${String(i).padStart(2, "0")}.jpg`;
export const listingTitle = (l: Listing) => `${l.unit ? `${l.unit} – ` : ""}${l.address}, ${l.city}`;

export const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const num = new Intl.NumberFormat("en-CA");

/**
 * His active COMMERCIAL listings — businesses for sale, real and MLS®-backed (source: Realtylink, via
 * client-info.md, 2026-09-12). Co-listed with the Vancouver Elite Team. No photos are downloaded (Realtylink
 * holds 1–4 each) and some addresses are withheld pending a confidentiality agreement, so these render as
 * text-forward cards that drive to contact — not a public search, his own book of business.
 */
export type CommercialListing = {
  slug: string;
  kind: string;            // what it is: "Turnkey restaurant", "Restaurant & lounge", "Convenience & smoke shop"
  area: string;            // neighbourhood / district
  address?: string;        // shown when public; withheld (confidential: true) otherwise
  confidential?: boolean;  // address released under a confidentiality agreement
  price: number;
  sqft?: number;
  seats?: number;
  mls: string;
  status: "Active";
  note: string;            // one-line from the MLS® remarks
  rew: string;             // Realtylink source
};

export const commercialListings: CommercialListing[] = [
  {
    slug: "pender-restaurant",
    kind: "Turnkey restaurant",
    area: "Downtown Vancouver",
    address: "605 W Pender Street",
    price: 499000,
    sqft: 2250,
    seats: 45,
    mls: "C8078871",
    status: "Active",
    note: "Roughly $1M in annual sales on a $7,500 a month gross lease, operating since 2021.",
    rew: "https://www.realtylink.org/en/business~for-sale~vancouver/224983940",
  },
  {
    slug: "granville-restaurant",
    kind: "Restaurant",
    area: "Granville Entertainment District",
    confidential: true,
    price: 449999,
    sqft: 2860,
    seats: 90,
    mls: "C8081728",
    status: "Active",
    note: "Over $600,000 in renovations, with a lease to 2030 plus a five-year option.",
    rew: "https://www.realtylink.org/en/business~for-sale~vancouver/224986797",
  },
  {
    slug: "westend-lounge",
    kind: "Restaurant & lounge",
    area: "West End",
    confidential: true,
    price: 329000,
    sqft: 2730,
    seats: 89,
    mls: "C8081766",
    status: "Active",
    note: "Food Primary and Liquor Primary licences, with a lease to March 2030 plus a five-year option.",
    rew: "https://www.realtylink.org/en/business~for-sale~vancouver/224986835",
  },
  {
    slug: "hastings-cityview",
    kind: "Smoke, vape & convenience",
    area: "Downtown Vancouver",
    address: "150 W Hastings Street",
    price: 89000,
    sqft: 2856,
    mls: "C8079503",
    status: "Active",
    note: "The Cityview store, operating since 2022.",
    rew: "https://www.realtylink.org/en/business~for-sale~vancouver/224984572",
  },
  {
    slug: "pender-chinatown",
    kind: "Convenience, smoke & vape",
    area: "Chinatown",
    address: "39 E Pender Street",
    price: 79000,
    sqft: 1498,
    mls: "C8079583",
    status: "Active",
    note: "The Chinatown Convenience Store, on a $1,600 a month gross rent.",
    rew: "https://www.realtylink.org/en/business~for-sale~vancouver/224984652",
  },
];
