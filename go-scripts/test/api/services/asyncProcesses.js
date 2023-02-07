const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.asyncProcesses');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 20000,
});

module.exports.search = async function search(query, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/async-process', {
      params: { ...query, limit: 100 },
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.create = async function create(body, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId)
      .post('/async-process', {
        data: body,
        context,
      });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.sendApproval = async function sendApproval(body, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId)
      // TODO en un feature futuro se cambiara a 'async process'
      // TODO se debera agregar el params type
      .post('/bulk/send-approval', {
        data: body,
        context,
      });
    return response.data;
  } catch (error) {
    const apiError = getAPIError(error);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.getDetail = async function getDetail(params, sessionId, context) {
  try {
    const { data } = await secureClient(client, sessionId).get(`/async-process/${params.id}/detail`, {
      params,
      context,
    });

    return data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.getDownloadFile = async function getDownloadFile(processId, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get(`/async-process/download-file/${processId}`, {
      processId,
      context,
    });
    return response;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

