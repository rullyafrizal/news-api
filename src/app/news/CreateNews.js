const Request = require('src/domain/news/CreateNews');

class CreateNews {
  constructor({ newsRepository, tagRepository, topicRepository }) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
    this.topicRepository = topicRepository;
  }

  async execute(args) {
    try {
      const topic = await this.topicRepository.findById(args.topicId);
      if (!topic) {
        const error = new Error('topic not found.');
        error.errors = [{ message: 'topic not found.', path: ['id'] }];
        throw error;
      }

      const newsRequest = new Request({
        title: args.title,
        slug: args.title,
        content: args.content,
        topicId: args.topicId,
        publishedAt: args.publishedAt,
        status: args.status,
        tags: args.tags
      });

      const { title, slug, content, topicId, publishedAt, status, tags } = newsRequest.getNewsRequest();

      const newsCreated = await this.newsRepository.create({
        title,
        slug,
        content,
        topicId,
        publishedAt,
        status
      });

      if (tags.length > 0) {
        const tagsCreated = await Promise.all(tags.map(tag => this.tagRepository.findOrCreate(tag)));
        await Promise.all(tagsCreated.map(tag => newsCreated.addTag(tag)));
      }

      return newsCreated.toJSON();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CreateNews;
