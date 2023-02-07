const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.moneyOut');
const { secureClient } = require('odin/security');

const { transformParams } = require('../../utils/transformParams');
const { getAPIError } = require('../errors');

const options = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 25000,
});

module.exports.search = async function search(params, sessionId, context) {
  const paramsData = transformParams(params);
  try {
    const response = await secureClient(options, sessionId).get('/payout/search', {
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
  const params = {
    limit: body.limit,
    offset: body.offset,
  };
  try {
    const response = await secureClient(options, sessionId).post('/payout/search', {
      data,
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
