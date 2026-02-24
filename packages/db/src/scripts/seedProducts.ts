import { connectDB, disconnectDB } from "../connection.js";
import { Product } from "../models/product.model.js";

async function main() {
  await connectDB();

  const seedProducts = [
    {
      slug: "peri",
      name: "Peri Peri Chips",
      description:
        "Turn up the heat with a punchy chilli kick and smoky notes in every crisp.",
      price: 70 * 100, // paise
      imageUrl: "/Peri.png",
      sku: "MOONZY-PERI",
      stock: 1_000,
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: "pudina",
      name: "Pudina Mint Chips",
      description:
        "Cool mint, herby vibes and a light crunch that keeps things refreshingly snappy.",
      price: 70 * 100,
      imageUrl: "/Mint.png",
      sku: "MOONZY-PUDINA",
      stock: 1_000,
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: "caramel",
      name: "Caramel Chips",
      description:
        "Warm caramel, buttery notes and a mellow sweetness made for slow-snack moments.",
      price: 70 * 100,
      imageUrl: "/Caramel.png",
      sku: "MOONZY-CARAMEL",
      stock: 1_000,
      isActive: true,
      sortOrder: 3,
    },
    {
      slug: "hing",
      name: "Hing Chutney Chips",
      description:
        "Nostalgic street-style masala with big hing character and a seriously loud crunch.",
      price: 70 * 100,
      imageUrl: "/Hing.png",
      sku: "MOONZY-HING",
      stock: 1_000,
      isActive: true,
      sortOrder: 4,
    },
  ] as const;

  for (const p of seedProducts) {
    const doc = await Product.findOneAndUpdate(
      { slug: p.slug },
      {
        $set: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          imageUrl: p.imageUrl,
          sku: p.sku,
          stock: p.stock,
          isActive: p.isActive,
          sortOrder: p.sortOrder,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Seeded product: ${doc.name} (${doc.slug})`);
  }

  await disconnectDB();
}

main().catch((err) => {
  console.error(err);
  void disconnectDB().finally(() => {
    process.exit(1);
  });
});

