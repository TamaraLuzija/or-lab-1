const fs = require("fs/promises");
const { join } = require("path");
const { writeToPath } = require("@fast-csv/format");

const db = require("./db")();

(async () => {
  const client = await db.connect();
  console.log("Exporting...");

  const products = (
    await client.query(
      `SELECT "product".*, "s"."slug" as "shop_slug", "s"."name" as "shop_name", "s"."description" as "shop_description", 
        "s"."background_image" as "shop_background_image", "s"."address" as "shop_address", "s"."contact" as "shop_contact", 
        "s"."rating" as "shop_rating", "s"."timezone" as "shop_timezone", "s"."created_at" as "shop_created_at"
      FROM "product" 
      JOIN "shop" as "s" ON "s"."id" = "product"."id"`
    )
  ).rows;

  const mapper = (prefix, product, not = false) => {
    return Object.fromEntries(
      Object.keys(product)
        .filter((k) => (not ? !k.startsWith(prefix) : k.startsWith(prefix)))
        .map((k) => [not ? k : k.slice(prefix.length), product[k]])
    );
  };

  const tmp = products.map((p) => {
    const shop = mapper("shop_", p);
    const product = mapper("shop_", p, true);

    return {
      ...product,
      images: JSON.parse(product["images"].replace("{", "[").replace("}", "]")),
      shop,
    };
  });

  await fs.writeFile(
    join(__dirname, "../out/result.json"),
    JSON.stringify(tmp, null, 2)
  );

  writeToPath(join(__dirname, "../out/result.csv"), products, {
    headers: true,
  });

  client.release();
  await db.end();
})();
