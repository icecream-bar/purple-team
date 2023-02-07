const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.refunds');
const { secureClient } = require('odin/security');

const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 20000,
});

module.exports.search = async function search(params, sessionId, context) {
  let MEUrl = '/pix/refunds/search';
  if (params.refund_id) {
    MEUrl = `/pix/refunds/${params.refund_id}`;
  }
  try {
    const response = await secureClient(client, sessionId).get(MEUrl, {
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

module.exports.create = async function create(refundRequest, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).post('/pix/refund', {
      data: refundRequest,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.refund = async function refunds(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).post('/pix/refunds/close', {
      data: params,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.download = async function dowload(params, sessionId, context) {
  const MEUrl = '/pix/refunds/download';
  try {
    const response = await secureClient(client, sessionId).get(MEUrl, {
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
