export const products = [
  {
    id: "peri",
    name: "Sizzlin’ Peri Peri",
    tag: "Fiery & Bold",
    description:
      "Turn up the heat with a punchy chilli kick and smoky notes in every crisp.",
    image: "/Peri.png",
    accent: "#B93C3F",
    notes:
      "Perfect for game nights, binge sessions and when you need your snack to be as dramatic as your group chat.",
    price: 120,
  },
  {
    id: "pudina",
    name: "Cool Pudina Pop",
    tag: "Fresh & Zesty",
    description:
      "Cool mint, herby vibes and a light crunch that keeps things refreshingly snappy.",
    image: "/Mint.png",
    accent: "#E8F8D5",
    notes: "Great with chai breaks, gossip sessions and breezy evening hangs.",
    price: 110,
  },
  {
    id: "caramel",
    name: "Buttery Caramel Crunch",
    tag: "Sweet & Comforting",
    description:
      "Warm caramel, buttery notes and a mellow sweetness made for slow-snack moments.",
    image: "/Caramel.png",
    accent: "#FFE4C2",
    notes:
      "Movie night, solo self-care or sharing with that one friend who ‘doesn’t like spicy’.",
    price: 130,
  },
  {
    id: "hing",
    name: "Masala Hing Burst",
    tag: "Iconic & Desi",
    description:
      "Nostalgic street-style masala with big hing character and a seriously loud crunch.",
    image: "/Hing.png",
    accent: "#D5F6E3",
    notes:
      "Pairs best with long catch-ups, card games and every desi craving in between.",
    price: 115,
  },
] as const;

export type Product = (typeof products)[number];
export type ProductId = Product["id"];

