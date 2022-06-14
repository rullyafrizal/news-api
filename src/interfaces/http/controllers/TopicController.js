const Status = require('http-status');
const BaseController = require('./BaseController');
const TopicValidator = require("../validators/TopicValidator");

class TopicController extends BaseController {
  constructor() {
    super();
  }

  async index (req, res) {
    try {
      const getAllTopic = req.container.resolve('getAllTopic');
      const result = await getAllTopic.execute();

      return super.successResponse(res, 'get:all_topic:success', result);
    } catch (e) {
      console.log(e);
      return super.internalErrorResponse(res, e.message, e.errors);
    }
  }

  async show (req, res) {
    try {
      const getTopic = req.container.resolve('getTopic');
      const result = await getTopic.execute(req.params);

      return super.successResponse(res, 'get:topic:success', result);
    } catch (e) {
      switch (e.message) {
        case 'topic not found.':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }

  async store (req, res) {
    try {
      const { success, message, error } = await (new TopicValidator()).validateStore(req.body);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const storeTopic = req.container.resolve('createTopic');
      const result = await storeTopic.execute(req.body);

      return super.successResponse(res, 'create:topic:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'topic already exists.':
          return super.badRequest(res, e.message, e.errors);
        case 'Validation failed!':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }

  async update (req, res) {
    try {
      const { success, message, error } = await (new TopicValidator()).validateUpdate(req.body, req.params);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const updateTopic = req.container.resolve('updateTopic');
      const result = await updateTopic.execute({id: req.params.id, data: req.body});

      return super.successResponse(res, 'update:topic:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'topic not found.':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }

  async destroy (req, res) {
    try {
      const { success, message, error } = await (new TopicValidator()).validateDestroy(req.params);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const deleteTopic = req.container.resolve('deleteTopic');
      const result = await deleteTopic.execute(req.params);

      return super.successResponse(res, 'delete:topic:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'topic not found.':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }
}

module.exports = TopicController;
