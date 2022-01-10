import fs from "fs/promises";
import { join } from "path";

import { writeToPath } from "@fast-csv/format";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { Pool } from "pg";

const db = new Pool({
  connectionString: `postgres://${process.env["DB_USER"]}:${process.env["DB_PASS"]}@localhost/or`,
});

const sharedClient = db.connect();

export default withApiAuthRequired(async function myApiRoute(req, res) {
  const { user } = getSession(req, res);

  const client = await sharedClient;
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

  console.log(user);

  await fs.writeFile(
    join(process.cwd(), "./public/result.json"),
    JSON.stringify({ date: new Date().toISOString(), generatedBy: user.email, data: tmp }, null, 2)
  );

  writeToPath(join(process.cwd(), "./public/result.csv"), products, {
    headers: true,
  });

  res.json({ ok: true });
});
