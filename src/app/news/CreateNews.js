const News = require('src/domain/News');
const Tag = require('src/domain/Tag');
const Request = require('src/domain/news/CreateNews');

class CreateNews {
  constructor({ newsRepository, tagRepository }) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
  }

  async execute(args) {
    try {
      const news = new News({
        title: args.title,
        content: args.content,
        topicId: args.topicId,
        publishedAt: args.publishedAt,
        status: args.status,
      });

      // TODO: finish this implementation
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CreateNews;
