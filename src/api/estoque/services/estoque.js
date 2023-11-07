'use strict';

/**
 * estoque service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::estoque.estoque');
