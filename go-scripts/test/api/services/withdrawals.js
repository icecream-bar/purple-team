const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.withdrawals');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
// const env = require('nordic/env');
const { getAPIError } = require('../errors');

const clientV1 = restclient({
  baseURL: config.api.internal.withdrawalsME,
  timeout: 5000,
});

const clientV2 = restclient({
  baseURL: config.api.internal.withdrawalsMEv2,
  timeout: 5000,
});

// const clientV1 = restclient({
//   baseURL: 'https://internal-api.mercadopago.com/beta/admin_withdrawals_middleend',
//   timeout: 5000,
// });

// const clientV2 = restclient({
//   baseURL: 'https://internal-api.mercadopago.com/v2/beta/admin_withdrawals_middleend',
//   timeout: 5000,
// });

module.exports.search = async function search(query, sessionId, context) {
  const queryString = `/withdrawals/${query.site_id}`;
  try {
    const response = await secureClient(clientV1, sessionId).get(queryString, {
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

module.exports.createReport = async function createReport(body, sessionId, context) {
  const newBody = body.id ? {
    site_id: body.site_id,
    type: body.type,
    filters: {
      id: body.id,
      site_id: body.site_id,
    },
  } : body;
  try {
    const response = await secureClient(clientV2, sessionId).post('/reports', {
      data: newBody,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.details = async function search(id, sessionId, context) {
  try {
    const response = await secureClient(clientV1, sessionId).get(`/withdrawals/${id}/detail`, {
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.getconfig = async function search(query, sessionId, context) {
  try {
    const response = await secureClient(clientV2, sessionId).get('/configurations', {
      params: { site_id: query.site_id, ids: 'payer_banks,banking_connections,tags,bank_account_types,holder_identifications' },
      // params: query,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

