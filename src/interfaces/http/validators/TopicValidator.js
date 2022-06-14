const Joi = require('joi')
const BaseValidator = require('./BaseValidator')

class TopicValidator extends BaseValidator {
  constructor() {
    super();
  }

  async validateStore(body) {
    const schema = {
      name: Joi.string().required(),
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
      name: Joi.string().required(),
    }

    return super.validateBody(schema, body);
  }

  async validateDestroy(params) {
    const paramSchema = {
      id: Joi.number().required(),
    }

    return super.validateParam(paramSchema, params);
  }
}

module.exports = TopicValidator;
