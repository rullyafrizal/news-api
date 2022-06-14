const Status = require('http-status');
const BaseController = require('./BaseController');

class TopicController extends BaseController {
  constructor() {
    super();
  }

  async index (req, res) {
    try {
      const getAllTopic = req.container.resolve('getAllTopic');
      const result = await getAllTopic.execute();

      return res.status(Status.OK).json({
        code: Status.OK,
        message: 'get:topics:success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(Status.SERVICE_UNAVAILABLE).json(e);
    }
  }

  async show (req, res) {
    try {
      const getTopic = req.container.resolve('getTopic');
      const result = await getTopic.execute(req.params);

      return res.status(Status.OK).json({
        code: Status.OK,
        message: 'get:topic:success',
        data: result,
      });
    } catch (e) {
      switch (e.message) {
        case 'topic not found.':
          return res.status(Status.NOT_FOUND).json(e.errors);
        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(e);
      }
    }
  }

  async store (req, res) {
    try {
      const storeTopic = req.container.resolve('createTopic');
      const result = await storeTopic.execute(req.body);

      return res.status(Status.OK).json({
        code: Status.OK,
        message: 'create:topic:success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'topic Already Exists.':
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(e.errors);

        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(e);
      }
    }
  }

  async update (req, res) {
    try {
      const updateTopic = req.container.resolve('updateTopic');
      const result = await updateTopic.execute({id: req.params.id, data: req.body});

      return res.status(Status.OK).json({
        code: Status.OK,
        message: 'update:topic:success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'topic not found.':
          return res.status(Status.NOT_FOUND).json(e.errors);
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(e.errors);
        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(e);
      }
    }
  }

  async destroy (req, res) {
    try {
      const deleteTopic = req.container.resolve('deleteTopic');
      const result = await deleteTopic.execute(req.params);

      return res.status(Status.OK).json({
        code: Status.OK,
        message: 'delete:topic:success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'topic not found.':
          return res.status(Status.NOT_FOUND).json(e.errors);
        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(e);
      }
    }
  }
}

module.exports = TopicController;
