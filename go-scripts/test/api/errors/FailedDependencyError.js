const APIError = require('./APIError');

class FailedDependencyError extends APIError {
  constructor(data) {
    super(data.message);
    this.userMessage = '*** 424 - External dependency or API failed ***';
    this.status = data.status;
    this.cause = data.cause;
    this.error = data.error;
  }
}

module.exports = FailedDependencyError;
