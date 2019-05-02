'use strict';

/**
 * Brand.js controller
 *
 * @description: A set of functions called "actions" for managing `Brand`.
 */

module.exports = {

  /**
   * Retrieve brand records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.brand.search(ctx.query);
    } else {
      return strapi.services.brand.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a brand record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.brand.fetch(ctx.params);
  },

  /**
   * Count brand records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.brand.count(ctx.query);
  },

  /**
   * Create a/an brand record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.brand.add(ctx.request.body);
  },

  /**
   * Update a/an brand record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.brand.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an brand record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.brand.remove(ctx.params);
  }
};
