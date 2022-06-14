const Status = require('http-status');
const BaseController = require('./BaseController');
const NewsValidator = require('../validators/NewsValidator');

class NewsController extends BaseController {
  constructor() {
    super();
  }

  async index (req, res) {
    try {
      const getAllNews = req.container.resolve('getAllNews');
      const result = await getAllNews.execute(req.query);

      return super.successResponse(res, 'get:all_news:success', result);
    } catch (e) {
      console.log(e);
      return super.internalErrorResponse(res, e.message, e.errors);
    }
  }

  async store (req, res) {
    try {
      const { success, message, error } = await (new NewsValidator()).validateStore(req.body);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const createNews = req.container.resolve('createNews');
      const result = await createNews.execute(req.body);

      return super.successResponse(res, 'create:news:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }

  async show (req, res) {
    try {
      const { success, message, error } = await (new NewsValidator()).validateShow(req.params);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const getNews = req.container.resolve('getNews');
      const result = await getNews.execute(req.params.id);

      return super.successResponse(res, 'show:news:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'news not found.':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }

  async update (req, res) {
    try {
      const { success, message, error } = await (new NewsValidator()).validateUpdate(req.body, req.params);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const updateNews = req.container.resolve('updateNews');
      const result = await updateNews.execute(req.params.id, req.body);

      return super.successResponse(res, 'update:news:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'news not found.':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }

  async destroy (req, res) {
    try {
      const { success, message, error } = await (new NewsValidator()).validateDestroy(req.params);

      if (!success) {
        return super.badRequest(res, message, error);
      }

      const deleteNews = req.container.resolve('deleteNews');
      const result = await deleteNews.execute(req.params.id);

      return super.successResponse(res, 'delete:news:success', result);
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'news not found.':
          return super.badRequest(res, e.message, e.errors);
        default:
          return super.internalErrorResponse(res, e.message, e.errors);
      }
    }
  }
}

module.exports = NewsController;
