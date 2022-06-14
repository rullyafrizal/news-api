const Topic = require('src/domain/Topic');

class GetAllTopic {
  constructor({ topicRepository }) {
    this.topicRepository = topicRepository;
  }

  async execute() {
    try {
      const topics = await this.topicRepository.findAll();

      return topics.map(topic => new Topic(topic.dataValues).toJSON());
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetAllTopic;
