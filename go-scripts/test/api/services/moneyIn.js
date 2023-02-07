const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.moneyIn');
const { secureClient } = require('odin/security');

const { transformParamsMoneyIn } = require('../../utils/transformParamsMoneyIn');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 25000,
});

module.exports.search = async function search(params, sessionId, context) {
  let entity = 'payins';
  if (params.type === 'money_in') {
    entity = 'transfer2payment';
  }
  const paramsData = transformParamsMoneyIn(params);
  try {
    const response = await secureClient(client, sessionId).get(`/${entity}/search`, {
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
  let entity = 'payins';
  if (body.type === 'money_in') {
    entity = 'transfer2payment';
  }
  const data = transformParamsMoneyIn(body);
  try {
    const response = await secureClient(client, sessionId).post(`/${entity}/search`, {
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
