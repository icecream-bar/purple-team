const restclient = require('nordic/restclient'); // eslint-disable-line no-unused-vars
const log = require('nordic/logger')('api.services.bankAccounts'); // eslint-disable-line no-unused-vars
const { secureClient } = require('odin/security'); // eslint-disable-line no-unused-vars
const config = require('nordic/config'); // eslint-disable-line no-unused-vars
const { getAPIError } = require('../errors'); // eslint-disable-line no-unused-vars

const client = restclient({ // eslint-disable-line no-unused-vars
  baseURL: config.api.internal.baseUrlME,
  timeout: 20000,
});


module.exports.search = async function search(query, sessionId, context, api) { // eslint-disable-line no-unused-vars
  try {
    const response = await secureClient(client, sessionId).get('/bank_accounts/search', {
      params: query,
      headers: { 'x-api': api || '' },
      context,
    });
    return response.data;
  } catch (e) { // eslint-disable-line no-unreachable
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.modify = async function modify(account, sessionId, context) { // eslint-disable-line no-unused-vars
  try {
    const response = await secureClient(client, sessionId)
      .put(`/users/${account.user_id}/bank_accounts/${account.id}`, {
        data: account,
        context,
      });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.create = async function create(body, sessionId, context) { // eslint-disable-line no-unused-vars
  try {
    const response = await secureClient(client, sessionId)
      .post('/bank_accounts', {
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

module.exports.getConfigurations = async function getConfigurations(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/bank_accounts/configurations', {
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

module.exports.getFormCreateBankAccout = async function getFormCreateBankAccout(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/master_data/form', {
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

module.exports.getTableConfigBankAccout = async function getTableConfigBankAccout(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/master_data/table', {
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
