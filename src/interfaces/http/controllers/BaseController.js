// Dependencies
const { Router } = require('express');

// Container
const container = require('src/container');

class BaseController {
  constructor() {
    this.router = new Router();
  }

  successResponse (res, message = 'Success', data = null, statusCode = 200) {
    return res.status(statusCode)
      .send({
        code: statusCode,
        message: message,
        data: data
      })
  }

  badRequest (res, message = 'Bad Request', data = null) {
    const statusCode = 400
    return res.status(statusCode)
      .send({
        code: statusCode,
        message: message,
        details: data
      })
  }

  forbidden (res, message = 'Forbidden') {
    const statusCode = 403
    return res.status(statusCode)
      .send({
        code: statusCode,
        message: message
      })
  }

  internalErrorResponse (res, message, error) {
    const statusCode = 500
    return res.status(statusCode)
      .send({
        code: statusCode,
        message: message,
        details: process.env.APP_DEBUG === 'true' ? error.stack : 'error stack can be showed'
      })
  }

  unprocessableEntityResponse (res, message, validation) {
    const statusCode = 422
    return res.status(statusCode)
      .send({
        code: statusCode,
        message: message,
        details: validation
      })
  }

  notFoundResponse (res, message = 'Not Found') {
    const statusCode = 404
    return res.status(statusCode)
      .send({
        code: statusCode,
        message: message
      })
  }
}

module.exports = BaseController;
