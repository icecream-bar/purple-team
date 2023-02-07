const restclient = require('nordic/restclient');
const config = require('nordic/config');
const log = require('nordic/logger')('api.services.automaticWithdrawals');
const { secureClient } = require('odin/security');

const { getAPIError } = require('../errors');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 10000,
});

module.exports.search = async function search(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId)
      .get(`/payoutautomatic/search/${params.user_id}/${params.gmt_user}`, {
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

module.exports.searchCbt = async function search(params, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).get('/payoutautomatic/cbt/search', {
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

module.exports.create = async function create(withdrawlConfigRequest, sessionId, context) {
  try {
    // ?la api de withdraw de retiros automaticos solo perimite cuentas
    // ?bank_account es decir de withdrawl y estas son enteras
    withdrawlConfigRequest.bank_account_id = parseInt(withdrawlConfigRequest.bank_account_id, 10);
    withdrawlConfigRequest.min_account_balance = parseInt(withdrawlConfigRequest.min_account_balance, 10);

    // TODO: debe de pegarle a payoutautomatic approval ?????
    const response = await secureClient(client, sessionId).post('/payoutautomatic/approval', {
      data: withdrawlConfigRequest,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.createCBT = async function createCBT(withdrawlConfigRequest, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).post('/payoutautomatic/cbt/create', {
      data: withdrawlConfigRequest,
      context,
    });

    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.modify = async function modify(withdrawlConfigRequest, sessionId, context) {
  try {
    // ?la api de withdrawals recibe estos dos propiedades de tipo entero
    withdrawlConfigRequest.bank_account_id = parseInt(withdrawlConfigRequest.bank_account_id, 10);
    withdrawlConfigRequest.min_account_balance = parseInt(withdrawlConfigRequest.min_account_balance, 10);
    // ?Para withdrawals el ratio o porcentaje es siempre 100%
    withdrawlConfigRequest.ratio = 1;
    const response = await secureClient(client, sessionId).post('/payoutautomatic/approval_modify', {
      data: withdrawlConfigRequest,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

module.exports.modifyCBT = async function modifyCBT(withdrawlConfigRequest, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).post('/payoutautomatic/cbt/modify', {
      data: withdrawlConfigRequest,
      context,
    });
    return response.data;
  } catch (e) {
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};

