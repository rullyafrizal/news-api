const { Op } = require('sequelize');

class GetAllNews {
  constructor({ newsRepository, tagRepository, topicRepository }) {
    this.newsRepository = newsRepository;
    this.tagRepository = tagRepository;
    this.topicRepository = topicRepository;
  }

  async execute(args) {
    try {
      const { search, status, topic } = args;
      const where = {}

      if (search) where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } }
      ];

      if (status) where.status = status.toUpperCase();

      if (topic) {
        const topicFound = await this.topicRepository.find('name', topic);

        if (topicFound) {
          where.topicId = topicFound.id;
        }
      }

      const news = await this.newsRepository.findAllWithIncludes(where, [
        {
          model: this.tagRepository.model,
          as: 'tags',
          through: {attributes: []}
        },
        {
          model: this.topicRepository.model,
          as: 'topic'
        },
      ], [
        'id', 'title', 'slug',
        'content', 'status', 'createdAt',
        'updatedAt', 'publishedAt'
      ]);

      return news;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetAllNews;
