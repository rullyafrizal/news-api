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

      console.log(where)

      if (topic) {
        const topicFound = await this.topicRepository.find('name', topic);
        if (!topicFound) {
          const error = new Error('topic not found.');
          error.errors = [{ message: 'topic not found.', path: ['id'] }];
          throw error;
        }
        where.topicId = topicFound.id;
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
      ]);

      return news;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetAllNews;