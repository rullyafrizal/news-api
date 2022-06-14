const Topic = require('src/domain/Topic');
const BaseRepository = require('./BaseRepository');

class TopicRepository extends BaseRepository {
  constructor({ models }) {
    super(models.TopicModel, Topic);
  }
}

module.exports = TopicRepository;
