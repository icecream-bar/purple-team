const APIError = require('./APIError');
const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const FailedDependencyError = require('./FailedDependencyError');

function getAPIError(error) {
  if (!(error instanceof Error)) {
    throw new TypeError('[error] must be a valid Error');
  }

  const status = error.response ? error.response.status : 500;
  const message = error?.response?.data?.message || error.message || 'Api call error.';
  const data = error?.response?.data || {};

  switch (status) {
    case 404:
      return new NotFoundError(message);
    case 400:
      return new BadRequestError(message);
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 424:
      return new FailedDependencyError(data);
    default:
      return new APIError(message);
  }
}

module.exports = {
  APIError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  getAPIError,
};
