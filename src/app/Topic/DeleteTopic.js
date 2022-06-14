class DeleteTopic {
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
      await this.topicRepository.destroy(args.id);

      return {
        id: args.id
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteTopic;
