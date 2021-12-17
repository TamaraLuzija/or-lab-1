import { FastifyPluginAsync } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import db from "../../db";

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

const productsRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const createSchema = Type.Omit(ProductSchema, ["id", "created_at", "rating"]);
  const createOk = ProductSchema;
  const createError = Type.Object({
    message: Type.String(),
  });
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
      console.log("request", request.query);
      const products = await db.product.findMany();
      reply.send(products);
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          201: createOk,
          400: createError,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });

      reply.send(product);
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
          201: createOk,
          400: createError,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });
      reply.send(product?.images);
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
          201: createOk,
          400: createError,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });
      reply.send(product?.main_image);
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id/shop",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          201: createOk,
          400: createError,
        },
      },
    },
    async (request, reply) => {
      const product = await db.product.findFirst({
        where: {
          id: request.params.id,
        },
      });
      const shop = await db.shop.findFirst({
        where: {
          id: product?.shop_id,
        },
      });
      reply.send(shop);
    }
  );

  fastify.post<{ Body: Static<typeof createSchema> }>(
    "/",
    {
      schema: {
        tags: ["products"],
        body: createSchema,
        response: {
          201: createOk,
          400: createError,
        },
      },
    },
    async (request, reply) => {
      try {
        const newProduct = await db.product.create({
          data: {
            ...request.body,
          },
        });

        reply.code(201).send(newProduct);
      } catch (error) {
        if (error instanceof Error) {
          reply.code(400).send({
            message: error.message,
          });
        } else {
          reply.code(400).send({
            message: error as any,
          });
        }
      }
    }
  );

  fastify.put<{ Params: { id: number }; Body: Static<typeof createSchema> }>(
    "/:id",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        body: createSchema,
        response: {
          201: createOk,
          400: createError,
        },
      },
    },
    async (request, reply) => {
      const updatedProduct = await db.product.update({
        where: {
          id: request.params.id,
        },
        data: {
          ...request.body,
        },
      });
      reply.send(updatedProduct);
    }
  );

  fastify.delete<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        tags: ["products"],
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Type.Object({
            ok: Type.Boolean(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await db.product.delete({
        where: {
          id,
        },
      });

      reply.send({ ok: true });
    }
  );
};

export default productsRoute;
