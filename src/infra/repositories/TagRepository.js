const Tag = require('src/domain/Tag');
const BaseRepository = require('./BaseRepository');

class TagRepository extends BaseRepository {
  constructor({ models }) {
    super(models.TagModel, Tag);
  }

  async findOrCreate(name) {
    const existing = await this.find('name', name);
    if (existing) {
      return existing;
    }
    const tag = new Tag({ name });
    return this.create(tag.toJSON());
  }
}

module.exports = TagRepository;
