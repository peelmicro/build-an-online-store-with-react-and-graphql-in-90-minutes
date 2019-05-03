'use strict';

/**
 * Brew.js controller
 *
 * @description: A set of functions called "actions" for managing `Brew`.
 */

module.exports = {

  /**
   * Retrieve brew records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.brew.search(ctx.query);
    } else {
      return strapi.services.brew.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a brew record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.brew.fetch(ctx.params);
  },

  /**
   * Count brew records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.brew.count(ctx.query);
  },

  /**
   * Create a/an brew record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.brew.add(ctx.request.body);
  },

  /**
   * Update a/an brew record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.brew.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an brew record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.brew.remove(ctx.params);
  }
};
