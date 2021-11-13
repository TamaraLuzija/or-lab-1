import { Pool } from "pg";

const pool = new Pool({
  connectionString: `postgres://${process.env["DB_USER"]}:${process.env["DB_PASS"]}@localhost/or-lab`,
});

const getProducts = async (req, res) => {
  const results = await pool.query(
    `SELECT "product".*, "s"."slug" as "shop_slug", "s"."name" as "shop_name", "s"."description" as "shop_description", 
  "s"."background_image" as "shop_background_image", "s"."address" as "shop_address", "s"."contact" as "shop_contact", 
  "s"."rating" as "shop_rating", "s"."timezone" as "shop_timezone", "s"."created_at" as "shop_created_at"
FROM "product" 
JOIN "shop" as "s" ON "s"."id" = "product"."id"`
  );

  res.status(200).json(
    results.rows.map((row) => {
      const { raiting, images, ...rest } = row;

      return {
        ...rest,
        images: JSON.parse(`[${images.slice(1, -1)}]`),
        rating: raiting,
      };
    })
  );
};

export default getProducts;
