const News = require('src/domain/News');
const BaseRepository = require('./BaseRepository');

class NewsRepository extends BaseRepository {
  constructor({ models }) {
    super(models.NewsModel, News);
  }
}

module.exports = NewsRepository;
