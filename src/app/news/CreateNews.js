const News = require('src/domain/News');
const Tag = require('src/domain/Tag');
const Request = require('src/domain/news/CreateNews');
const slugify = require('slugify');
const SanitizeHtml = require('sanitize-html');

class CreateNews {
  constructor({ newsRepository, tagRepository }) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
  }

  async execute(args) {
    try {
      const newsRequest = new Request({
        title: args.title,
        slug: slugify('halo', { lower: true }),
        content: SanitizeHtml('halo'),
        topicId: args.topicId,
        publishedAt: args.publishedAt,
        status: args.status,
      });
      const { valid, errors } = newsRequest.validateBody();

      if (!valid) {
        const error = new Error('Validation failed!');
        error.errors = errors;
        throw error;
      }

      const tags = args.tags.split(',').map(tag => tag.trim());

      const newsCreated = await this.newsRepository.create(news);

      const tagsCreated = await Promise.all(tags.map(tag => this.tagRepository.create({ name: tag })));

      await Promise.all(tagsCreated.map(tag => newsCreated.addTag(tag)));

      return newsCreated.toJSON();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CreateNews;
