const Request = require('src/domain/news/UpdateNews');

class UpdateNews {
  constructor({newsRepository, tagRepository, topicRepository}) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
    this.topicRepository = topicRepository;
  }

  async execute(id, args) {
    try {
      const news = await this.newsRepository.findById(id);
      if (!news) {
        const error = new Error('news not found.');
        error.errors = [{message: 'news not found.', path: ['id']}];
        throw error;
      }

      const topic = await this.topicRepository.findById(args.topicId);
      if (!topic) {
        const error = new Error('topic not found.');
        error.errors = [{message: 'topic not found.', path: ['id']}];
        throw error;
      }

      const newsRequest = new Request({
        id: id,
        title: args.title,
        slug: args.title,
        content: args.content,
        topicId: args.topicId,
        publishedAt: args.publishedAt,
        status: args.status,
        tags: args.tags
      })

      const {title, slug, content, topicId, publishedAt, status, tags} = newsRequest.getNewsRequest();

      const newsUpdated = await this.newsRepository.update(id, {
        title,
        slug,
        content,
        topicId,
        publishedAt,
        status
      });

      if (tags.length > 0) {
        const news = await this.newsRepository.findWithIncludes('id', id, [
          {
            model: this.tagRepository.model,
            as: 'tags'
          }
        ]);

        await Promise.all(news.tags.map(tag => news.removeTag(tag)));

        const tagsCreated = await Promise.all(tags.map(tag => this.tagRepository.findOrCreate(tag)));
        await Promise.all(tagsCreated.map(tag => news.addTag(tag)));
      }

      return newsUpdated;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UpdateNews;
