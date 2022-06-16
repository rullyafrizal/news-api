class GetNews {
  constructor({ newsRepository, tagRepository, topicRepository }) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
    this.topicRepository = topicRepository;
  }

  async execute(id) {
    try {
      const news = await this.newsRepository.findWithIncludes('id', id, [
        {
          model: this.tagRepository.model,
          as: 'tags',
          through: {attributes: []}
        },
        {
          model: this.topicRepository.model,
          as: 'topic'
        }
      ]);

      if (!news) {
        const error = new Error('news not found.');
        error.errors = [{ message: 'news not found.', path: ['id'] }];
        throw error;
      }

      return news;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetNews;
