"use strict";
const stripe = require("stripe")("sk_test_0LJistMngdrwTKvSbP0LOxG7");

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

module.exports = {
  /**
   * Retrieve order records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.order.search(ctx.query);
    } else {
      return strapi.services.order.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a order record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.order.fetch(ctx.params);
  },

  /**
   * Count order records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.order.count(ctx.query);
  },

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const {
      address,
      amount,
      brews,
      postalCode,
      token,
      city
    } = ctx.request.body;

    // Send charge to Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: token
    });

    // Create order in database
    const order = await strapi.services.order.add({
      user: ctx.state.user._id,
      address,
      amount,
      brews,
      postalCode,
      city
    });

    return order;
  },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.order.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.order.remove(ctx.params);
  }
};
