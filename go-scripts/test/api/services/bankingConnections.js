const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.bankingConnections');
const { secureClient } = require('odin/security');

const { transformParams } = require('../../utils/transformParamsBankingConnections');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 10000,
});

module.exports.search = async function search(params, sessionId, context) {
  const paramsData = transformParams(params);
  try {
    const response = await secureClient(client, sessionId).get('/banking_connection/search', {
      params: paramsData,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.massiveSearch = async function massiveSearch(body, sessionId, context) {
  const data = transformParams(body);
  try {
    const response = await secureClient(client, sessionId).post('/banking_connection/search', {
      data,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);

    throw apiError;
  }
};
