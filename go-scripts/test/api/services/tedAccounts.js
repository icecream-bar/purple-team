const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.accountManagement');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 5000,
});

const getHeaders = (headers) => {
  const customHeaders = {
    'x-legacy-search': headers['xx-legacy-search'] ? headers['x-legacy-search'] : false,
  };
  return customHeaders;
};

module.exports.search = async function search(query, headers, sessionId, context) {
  const customHeaders = getHeaders(headers);
  try {
    const response = await secureClient(client, sessionId).get('/account_ted/search', {
      headers: customHeaders,
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

module.exports.disable = async function disable(accountId, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId)
      .put(`/account_ted/disable/${accountId}`, {
        context,
      });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.create = async function create(userId, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId)
      .post('/account_ted/create', {
        data: { user_id: parseInt(userId, 10) },
        context,
      });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};
