const Topic = require('src/domain/Topic');

class GetTopic {
  constructor({ topicRepository }) {
    this.topicRepository = topicRepository;
  }

  async execute(args) {
    try {
      const topic = await this.topicRepository.findById(args.id);
      if (!topic) {
        const error = new Error('Topic not found.');
        error.errors = [{ message: 'Topic not found.', path: ['id'] }];
        throw error;
      }

      const domainTopic = new Topic(topic.dataValues);
      return domainTopic.toJSON();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetTopic;
