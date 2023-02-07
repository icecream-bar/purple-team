const APIError = require('./APIError');

class NotFoundError extends APIError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;
