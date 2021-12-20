import fp from "fastify-plugin";
import fastifySwagger from "fastify-swagger";
import { ProductSchema, ShopSchema } from "../schemas";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async (fastify, opts) => {
  fastify.register(fastifySwagger, {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "products", description: "User related end-points" }],
      definitions: {
        Product: ProductSchema as any,
        Shop: ShopSchema as any,
      },
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    // uiHooks: {
    //   onRequest: function (request, reply, next) {
    //     next();
    //   },
    //   preHandler: function (request, reply, next) {
    //     next();
    //   },
    // },
    staticCSP: true,
    // transformStaticCSP: (header) => header,
    exposeRoute: true,
  });

  fastify.ready((err) => {
    if (err) throw err;
    fastify.swagger();
  });
});
