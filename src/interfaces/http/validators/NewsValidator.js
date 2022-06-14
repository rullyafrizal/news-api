const Joi = require('joi')
const BaseValidator = require('./BaseValidator')

class NewsValidator extends BaseValidator {
  constructor() {
    super();
  }

  async validateStore(body) {
    const schema = {
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.valid('draft', 'published').required(),
      topicId: Joi.number().required(),
      publishedAt: Joi.date().required(),
      tags: Joi.string()
    }

    return super.validateBody(schema, body);
  }

  async validateUpdate(body, params) {
    const paramSchema = {
      id: Joi.number().required(),
    }

    const { success, message, error } = super.validateParam(paramSchema, params);
    if (!success) {
      return { success, message, error };
    }

    const schema = {
      title: Joi.string().required(),
      content: Joi.string().required(),
      status: Joi.valid('draft', 'published').required(),
      topicId: Joi.number().required(),
      publishedAt: Joi.date().required(),
      tags: Joi.string()
    }

    return super.validateBody(schema, body);
  }

  async validateShow(params) {
    const paramSchema = {
      id: Joi.number().required(),
    }

    return super.validateParam(paramSchema, params);
  }

  async validateDestroy(params) {
    const paramSchema = {
      id: Joi.number().required(),
    }

    return super.validateParam(paramSchema, params);
  }
}

module.exports = NewsValidator;
