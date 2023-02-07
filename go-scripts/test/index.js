/**
 * New Relic
 */
if (process.env.NODE_ENV === 'production') {
  require('newrelic'); // eslint-disable-line global-require
}
require('odin/metrics');

/**
 * Babel register
 */
require('@babel/register')({ // eslint-disable-line import/no-extraneous-dependencies
  ignore: ['node_modules'],
});

/**
 * Module dependencies
 */
const ragnar = require('nordic/ragnar');

/**
 * Configuration
 */
const config = require('nordic/config');

/**
 * Middelwares
 */
const context = require('./middlewares/context');

/**
 * Routers
 */
const api = require('./api');
const app = require('./app/server');

/**
 * Expose Ragnar server instance
 */
const ragnarInstance = ragnar({
  config: config.ragnar,
  sharedPreMiddlewares: [ // Array of middlewares
    context,
  ],
  apiRouter: api,
  appRouter: app,
});

module.exports = ragnarInstance;
