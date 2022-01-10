import { Type } from "@sinclair/typebox";

export const ProductSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  short_description: Type.String(),
  main_image: Type.String(),
  images: Type.String(),
  description: Type.String(),
  price: Type.Number(),
  stock: Type.Number(),
  rating: Type.Number(),
  created_at: Type.String(),
  shop_id: Type.Number(),
});

export const ProductSchemaLD = Type.Union([
  ProductSchema,
  Type.Object({
    "@context": Type.Object({
      "@vocab": Type.Literal("https://schema.org/Product"),
      main_image: Type.Literal("image"),
      name: Type.Literal("name"),
    }),
  }),
]);

export const ShopSchema = Type.Object({
  id: Type.Number(),
  slug: Type.String(),
  name: Type.String(),
  description: Type.String(),
  background_image: Type.String(),
  address: Type.String(),
  contact: Type.String(),
  rating: Type.Number(),
  timezone: Type.String(),
  created_at: Type.String(),
});

export const ShopSchemaLD = Type.Union([
  ProductSchema,
  Type.Object({
    "@context": Type.Object({
      "@vocab": Type.Literal("https://schema.org/Store"),
      name: Type.Literal("name"),
      address: Type.Literal("address"),
      background_image: Type.Literal("image"),
    }),
  }),
]);

export const CreateBody = Type.Omit(ProductSchema, ["id", "created_at", "rating"]);
export const ErrorSchema = Type.Object({ message: Type.String() });

export const IdSchema = Type.Object({ id: Type.Number() });
