const APIError = require('./APIError');

class BadRequestError extends APIError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = BadRequestError;
