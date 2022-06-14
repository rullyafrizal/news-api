const Topic = require('src/domain/Topic');
const CreateTopic = require('src/domain/topic/CreateTopic');

class StoreTopic {
  constructor({ topicRepository }) {
    this.topicRepository = topicRepository;
  }

  async execute(args) {
    // Validate
    const topicData = new CreateTopic(args);
    const { valid, errors } = topicData.validate(args);

    if (!valid) {
      const error = new Error('Validation failed!');
      error.errors = errors;
      throw error;
    }

    // Find the user
    const existing = await this.topicRepository.find('name', args.name);
    if (existing) {
      const error = new Error('topic already exists.');
      error.errors = [{ message: 'topic already exists.', path: ['name'] }];
      throw error;
    }

    try {
      // Prepare data
      const data = {
        ...args,
      };

      // Create user
      const newTopic = await this.topicRepository.create(data);

      // Remove password and wrap to a domain
      const domainTopic = new Topic(newTopic.dataValues);

      return domainTopic.toJSON();
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}

module.exports = StoreTopic;
