const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.allowedUsers');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 10000,
});

module.exports.search = async function search(sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/general_config/users_allowed', {
      context,
    });
    return response.data;
  } catch (e) { // eslint-disable-line no-unreachable
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.updateList = async function updateList(body, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).put('/general_config/users_allowed/modify', {
      data: body,
      context,
    });
    return response.data;
  } catch (e) { // eslint-disable-line no-unreachable
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};
