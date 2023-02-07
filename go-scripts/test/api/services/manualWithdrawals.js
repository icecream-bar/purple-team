const restclient = require('nordic/restclient');
const log = require('nordic/logger')('api.services.manualWithdrawals');
const { secureClient } = require('odin/security');
const config = require('nordic/config');
const { getAPIError } = require('../errors');
const { amountToFloat } = require('../../utils/amountFormat');

const client = restclient({
  baseURL: config.api.internal.baseUrlME,
  timeout: 5000,
});

const transformCreateWithdrawBody = (body) => ({
  amount: amountToFloat(body.amount, body.country),
  account_id: body.bank_account_id,
  reference: body.reference ? body.reference : null,
  provider_id: body.provider_id || undefined,
  payer_id: body.user_id,
});

module.exports.create = async function create(body, sessionId, context) {
  try {
    const response = await secureClient(client, sessionId).post('/withdrawals', {
      data: transformCreateWithdrawBody(body),
      context,
    });
    return response.data;
  } catch (e) { // eslint-disable-line no-unreachable
    const apiError = getAPIError(e);
    log.error(`Status: ${apiError.status} - Message: ${apiError.message}`, context);
    throw apiError;
  }
};
