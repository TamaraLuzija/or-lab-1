var faker = require("faker");
const { default: slugify } = require("slugify");

const db = require("./db")();

(async () => {
  const client = await db.connect();
  console.log("Seeding...");

  await Promise.all(
    Array.from(new Array(10), async () => {
      const name = faker.company.companyName();
      const slug = slugify(name).toLowerCase();

      const shop = await db.query(
        'INSERT INTO "public"."shop" ("slug", "name", "description", "background_image", "address", "contact", "rating", "timezone", "created_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "id"',
        [
          slug,
          name,
          faker.lorem.sentences(2),
          faker.random.image(),
          faker.address.streetAddress(),
          faker.phone.phoneNumber(),
          faker.datatype.float({ min: 0, max: 5, precision: 2 }),
          faker.address.timeZone(),
          faker.date.past(),
        ]
      );

      const { id } = shop.rows[0];

      await Promise.all(
        Array.from(new Array(3), () =>
          db.query(
            'INSERT INTO "public"."product" ("name", "short_description", "description", "main_image", "images", "price", "stock", "raiting", "created_at", "shop_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING "id"',
            [
              faker.commerce.productName(),
              faker.lorem.sentences(1),
              faker.commerce.productDescription(),
              faker.random.image(),
              Array.from(new Array(3), () => faker.random.image()),
              faker.datatype.number({ min: 1, max: 100000 }),
              faker.datatype.number({ min: 1, max: 100000 }),
              faker.datatype.float({ min: 0, max: 5, precision: 2 }),
              faker.date.past(),
              id,
            ]
          )
        )
      );
    })
  );

  client.release();
  await db.end();
})();
