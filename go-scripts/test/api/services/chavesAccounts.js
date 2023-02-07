const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.accountManagement');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
const env = require('nordic/env');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: `${config.api.internal.baseUrlME}/financial_identity`,
  timeout: 15000,
});

const client2 = restclient({
  baseURL: `${config.api.internal.baseUrlME}/keys`,
  timeout: 15000,
});


module.exports.search = async function search(data, sessionId, context) {
  try {
    const response = await secureClient(client2, sessionId).post('/filter', {
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

module.exports.massiveDelete = async function massiveDelete(data, sessionId, context) {
  try {
    const response = await secureClient(client2, sessionId).post('/exclusions', {
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

module.exports.createKey = async function createKey(body, sessionId, context) {
  let h = {};
  if (body.testToken) {
    h = {
      'x-test-token': true,
      'x-skip-validation': true,
      'x-skip-kyc': true,
    };
  }
  const b = { id: body.id, type: body.type };
  const q = {
    'client.id': env.SECRET_FINA_IDENT_CLIENT_ID,
    'caller.siteId': 'MLB',
    'caller.id': body.usersID[0],
  };
  try {
    const response = await secureClient(client, sessionId).post('', {
      headers: h,
      params: q,
      data: b,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};
