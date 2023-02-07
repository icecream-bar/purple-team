const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.pix');
const { secureClient } = require('odin/security');

const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 5000,
});

// Saque-Troco page
module.exports.search = async function search(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/pix/search', {
      params,
      context,
      headers: { 'x-caller-scopes': 'admin' },
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

// Saldos page
module.exports.getDownloadExtractUrl = async function getDownloadExtractUrl(date, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get(`/banking_connection/download/${date}`, {
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.getBalance = async function getBalance(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/pix_bacen/balance', {
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

module.exports.updateReda022 = async function updateReda022(body, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).post('/pix/reda022/contact_update', {
      data: body,
      context,
      headers: { 'content-type': 'application/json' },
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.searchReda022 = async function searchReda022(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/pix/reda022/contact', {
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
