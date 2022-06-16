class DeleteNews {
  constructor({ newsRepository, tagRepository }) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
  }

  async execute(id) {
    try {
      const news = await this.newsRepository.findWithIncludes('id', id, [
        {
          model: this.tagRepository.model,
          as: 'tags'
        }
      ]);
      if (!news) {
        const error = new Error('news not found.');
        error.errors = [{ message: 'news not found.', path: ['id'] }];
        throw error;
      }

      await Promise.all(news.tags.map(tag => news.removeTag(tag)));

      const deletedNews = news.dataValues
      deletedNews.status = 'DELETED'

      await this.newsRepository.update(id, deletedNews)

      await this.newsRepository.destroy(id);

      return {
        id: id
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteNews;
