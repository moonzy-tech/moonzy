import "dotenv/config";
import { connectDB } from "@repo/db";
import { app } from "./app.js";

const PORT = Number(process.env["PORT"]) || 4000;

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
