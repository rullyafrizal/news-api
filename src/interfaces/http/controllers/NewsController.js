const Status = require('http-status');
const BaseController = require('./BaseController');
const NewsValidator = require('../validators/NewsValidator');

class NewsController extends BaseController {
  constructor() {
    super();
  }

  async store (req, res) {
    try {
      const { success, message, error } = await (new NewsValidator()).validateStore(req.body);

      if (!success) {
        return res.status(Status.BAD_REQUEST).json({
          success,
          message,
          error
        });
      }

      const createNews = req.container.resolve('createNews');
      const result = await createNews.execute(req.body);

      return res.status(Status.OK).json({
        code: Status.OK,
        message: 'create:news:success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      switch (e.message) {
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(e.errors);
        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(e);
      }
    }
  }
}

module.exports = NewsController;
