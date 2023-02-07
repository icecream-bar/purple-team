const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.transferManager');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 5000,
});


module.exports.search = async function search(query, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/transfermanager/search', {
      params: query,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.detail = async function detail(id, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get(`/transfer/${id}`, {
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};
