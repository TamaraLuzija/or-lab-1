import { FastifyPluginAsync, FastifyReply } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import db from "../../db";
import { ProductSchema, ErrorSchema, ShopSchema, CreateBody } from "../../schemas";

const json = (reply: FastifyReply, data: any, status = 200) => {
  reply.status(status).header("content-type", "application/json").send(data);
};

const productsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["products"],
        response: {
          200: Type.Array(ProductSchema),
        },
      },
    },
    async (request, reply) => {
      json(reply, await db.product.findMany());
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({ id: Type.Number() }),
        response: {
          200: ProductSchema,
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });

      if (!product) {
        return json(reply, { message: "Product not found" }, 404);
      }

      return json(reply, product);
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id/images",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Type.Object({ images: Type.Array(Type.String()) }),
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });

      if (!product) {
        return json(reply, { message: "Product not found" }, 404);
      }

      if (!product.images) {
        return json(reply, { message: "Product does not have any images" }, 404);
      }

      json(reply, { images: JSON.parse(`[${product.images.slice(1, -1)}]`) });
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id/main_image",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Type.Object({ mainImage: Type.String() }),
          400: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });

      if (!product) {
        return json(reply, { message: "Product not found" }, 404);
      }

      json(reply, { mainImage: product?.main_image });
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id/shop",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({ id: Type.Number() }),
        response: {
          200: ShopSchema,
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const shop = await db.shop.findFirst({
        where: {
          product: {
            some: {
              id: request.params.id,
            },
          },
        },
      });

      if (!shop) {
        return json(reply, { message: "Shop not found" }, 404);
      }

      json(reply, shop);
    }
  );

  fastify.post<{ Body: Static<typeof CreateBody> }>(
    "/",
    {
      schema: {
        tags: ["products"],
        body: CreateBody,
        response: {
          201: ProductSchema,
          400: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const newProduct = await db.product.create({ data: { ...request.body } });
        json(reply, newProduct, 201);
      } catch (error) {
        if (error instanceof Error) {
          json(reply, { message: error.message }, 400);
        } else {
          json(reply, { message: error as any }, 400);
        }
      }
    }
  );

  fastify.put<{ Params: { id: number }; Body: Static<typeof CreateBody> }>(
    "/:id",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        body: CreateBody,
        response: {
          200: ProductSchema,
          400: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const updatedProduct = await db.product.update({
          where: { id: request.params.id },
          data: { ...request.body },
        });
        json(reply, updatedProduct, 200);
      } catch (error) {
        if (error instanceof Error) {
          json(reply, { message: error.message }, 400);
        } else {
          json(reply, { message: error as any }, 400);
        }
      }
    }
  );

  fastify.delete<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({ id: Type.Number() }),
        response: {
          200: Type.Object({
            ok: Type.Boolean(),
          }),
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const product = await db.product.findUnique({ where: { id } });
      if (!product) {
        return json(reply, { message: "Product not found" }, 404);
      }

      await db.product.delete({ where: { id } });

      json(reply, { ok: true });
    }
  );
};

export default productsRoute;
