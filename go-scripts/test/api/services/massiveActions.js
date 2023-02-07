/**
 * Module dependencies
 */
const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.massiveActions');

const { secureClient } = require('odin/security');
const { getAPIError } = require('../errors');
const { transformMassiveActions } = require('../../utils/transformMassiveActions');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 5000,
});

module.exports.create = async function create(massiveAction, sessionId, context) {
  const massiveActionData = transformMassiveActions(massiveAction);
  try {
    const response = await secureClient(client, sessionId).post('/massive_action', {
      data: massiveActionData,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.search = async function search(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/massive_action/search', {
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

module.exports.summary = async function summary(id, params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get(`/massive_action/processes/summary/${id}`, {
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

module.exports.processes = async function processes(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/process/search', {
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
