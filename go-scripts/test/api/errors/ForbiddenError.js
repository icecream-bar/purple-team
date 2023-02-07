const APIError = require('./APIError');

class ForbiddenError extends APIError {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = ForbiddenError;
