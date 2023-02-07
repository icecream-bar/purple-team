/* eslint-disable  no-useless-constructor */
class APIError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

module.exports = APIError;
