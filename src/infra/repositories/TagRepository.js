const Tag = require('src/domain/Tag');
const BaseRepository = require('./BaseRepository');

class TagRepository extends BaseRepository {
  constructor({ models }) {
    super(models.TagModel, Tag);
  }
}

module.exports = TagRepository;
