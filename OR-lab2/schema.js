// @ts-check
const { join } = require("path");
const { writeFile } = require("fs/promises");

const S = require("fluent-json-schema").default;
const { compile } = require("json-schema-to-typescript");
const { format } = require("prettier");

const ProductSchema = S.object()
  .title("Product")
  .description("Object representing a product with a shop")
  .prop("id", S.integer().required())
  .prop("name", S.string().required())
  .prop("short_description", S.string().required())
  .prop("main_image", S.string().required())
  .prop("images", S.array().items(S.string()).required())
  .prop("description", S.string().required())
  .prop("price", S.integer().required())
  .prop("stock", S.integer().required())
  .prop("rating", S.number().required())
  .prop("created_at", S.string().required())
  .prop("shop_id", S.integer().required())
  .prop("shop_slug", S.string().required())
  .prop("shop_name", S.string().required())
  .prop("shop_description", S.string().required())
  .prop("shop_background_image", S.string().required())
  .prop("shop_address", S.string().required())
  .prop("shop_contact", S.string().required())
  .prop("shop_rating", S.number().required())
  .prop("shop_timezone", S.string().required())
  .prop("shop_created_at", S.string().required());

const Products = S.array()
  .id(
    "https://raw.githubusercontent.com/TamaraLuzija/otvoreno-racunarstvo/main/OR-lab2/public/schema.json"
  )
  .title("Product Catalog")
  .description("List of products with shops")
  .items(ProductSchema);

(async () => {
  await writeFile(
    join(__dirname, "./public/schema.json"),
    JSON.stringify(Products.valueOf(), null, 2)
  );

  const output = await compile(Products.valueOf(), "thingy");
  await writeFile(join(__dirname, "./types.ts"), format(output, { parser: "typescript" }));
})();
