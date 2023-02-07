/**
 * Module dependencies
 */
const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.configurations');

const { secureClient } = require('odin/security');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 5000,
});

module.exports.search = async function search(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/configuration/search', {
      params,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);

    throw apiError;
  }
};
