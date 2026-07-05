/**
 * Send success response
 * @param {Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 */
const sendSuccess = (
  res,
  statusCode = 200,
  message = "Success",
  data = undefined,
) => {
  const response = {
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param {Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {Array|null} details
 */
const sendError = (
  res,
  statusCode = 500,
  message = "Internal Server Error",
  details = undefined,
) => {
  const response = {
    message,
  };

  if (details !== undefined) {
    response.details = details;
  }

  return res.status(statusCode).json(response);
};

/**
 * Create custom error
 * @param {string} message
 * @param {number} statusCode
 * @param {Array|null} details
 */
const createError = (message, statusCode = 500, details = undefined) => {
  const error = new Error(message);

  error.statusCode = statusCode;

  if (details !== undefined) {
    error.details = details;
  }

  return error;
};

module.exports = {
  sendSuccess,
  sendError,
  createError,
};
