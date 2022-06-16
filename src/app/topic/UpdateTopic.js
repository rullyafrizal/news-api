const TopicUpdateRequest = require('src/domain/topic/UpdateTopic');

class UpdateTopic {
  constructor({ topicRepository }) {
    this.topicRepository = topicRepository;
  }

  async execute(args) {
    // Validate
    const topicData = new TopicUpdateRequest(args.data);

    // Find the topic
    const topic = await this.topicRepository.findById(args.id);
    if (!topic) {
      const error = new Error('topic not found.');
      error.errors = [{ message: 'topic not found.', path: ['id'] }];
      throw error;
    }

    try {
      // Prepare data
      const data = {
        ...args.data,
      }

      // Update topic
      const updatedTopic = await this.topicRepository.update(args.id, data);

      return {
        id: updatedTopic
      };
    } catch (error) {
      throw error
    }

  }
}

module.exports = UpdateTopic;
