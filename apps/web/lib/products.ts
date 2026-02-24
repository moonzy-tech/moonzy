export const products = [
  {
    id: "peri",
    name: "Peri Peri Chips",
    tag: "Fiery & Bold",
    description:
      "Turn up the heat with a punchy chilli kick and smoky notes in every crisp.",
    heroBg: "bg-peri",
    heroHeadlineLines: ["TURN UP THE HEAT", "WITH EVERY FIERY", "CRUNCH"],
    heroDescription:
      "Our Sizzlin' Hot Chips are made for the fearless snacker. Packed with intense spice and fiery flavor.",
    image: "/Peri.png",
    accent: "#B93C3F",
    notes:
      "Perfect for game nights, binge sessions and when you need your snack to be as dramatic as your group chat.",
    price: 70,
  },
  {
    id: "pudina",
    name: "Pudina Mint Chips",
    tag: "Fresh & Zesty",
    description:
      "Cool mint, herby vibes and a light crunch that keeps things refreshingly snappy.",
    heroBg: "bg-pudina",
    heroHeadlineLines: [
      "TURN UP THE ZING",
      "WITH EVERY MINTY",
      "CRUNCH",
    ],
    heroDescription:
      "Our Pudina Mint Crunch is made for the fresh thinkers. Packed with cool zing and crisp, refreshing flavor.",
    image: "/Mint.png",
    accent: "#E8F8D5",
    notes: "Great with chai breaks, gossip sessions and breezy evening hangs.",
    price: 70,
  },
  {
    id: "caramel",
    name: "Caramel Chips",
    tag: "Sweet & Comforting",
    description:
      "Warm caramel, buttery notes and a mellow sweetness made for slow-snack moments.",
    heroBg: "bg-caramel",
    heroHeadlineLines: [
      "INDULGE THE NIGHT",
      "WITH EVERY SILKY",
      "CRUNCH",
    ],
    heroDescription:
      "Our Golden Caramel Crunch is made for the sweet risk-taker. Packed with rich indulgence and smooth, buttery flavor.",
    image: "/Caramel.png",
    accent: "#FFE4C2",
    notes:
      "Movie night, solo self-care or sharing with that one friend who ‘doesn’t like spicy’.",
    price: 70,
  },
  {
    id: "hing",
    name: "Hing Chutney Chips",
    tag: "Iconic & Desi",
    description:
      "Nostalgic street-style masala with big hing character and a seriously loud crunch.",
    heroBg: "bg-hing",
    heroHeadlineLines: [
      "DESI DRAMA",
      "IN EVERY SAVAGE",
      "CRUNCH",
    ],
    heroDescription:
      "Our Hing Chutney Crunch is made for the bold desi snacker. Packed with tangy punch and unapologetic spice.",
    image: "/Hing.png",
    accent: "#D5F6E3",
    notes:
      "Pairs best with long catch-ups, card games and every desi craving in between.",
    price: 70,
  },
] as const;

export type Product = (typeof products)[number];
export type ProductId = Product["id"];

