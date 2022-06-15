const { expect } = require('chai');

const { topic: topicMock } = require('test/support/mock');
const CreateTopic = require('src/app/topic/CreateTopic');

describe('App :: Topic :: CreateTopic', () => {
  context('should work properly', () => {
    let createTopic;

    before(() => {
      const MockTopicRepository = {
        find: (field, value) => {
          return null
        },
        create: (data) => {
          return Promise.resolve({
            dataValues: {
              ...data
            },
          });
        }
      };

      createTopic = new CreateTopic({ topicRepository: MockTopicRepository });
    });

    it('will create and return the topic', async () => {
      const topic = await createTopic.execute({ name: 'Test Topic 2' });

      expect(topic).to.be.an('object');
      expect(topic).to.have.property('name');
      expect(topic.name).to.be.equal('Test Topic 2');
    });
  });

  context('validation error', () => {
    let createTopic;

    before(() => {
      const MockTopicRepository = {
        find: (field, value) => {
          return null
        },
        create: (data) => {
          return Promise.resolve({
            dataValues: {
              ...data
            },
          });
        }
      };

      createTopic = new CreateTopic({ topicRepository: MockTopicRepository });
    })

    it('will throw an error', async () => {
      try {
        await createTopic.execute({});
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('Validation failed!');
      }
    })
  })

  context('duplicate topic name', () => {
    let createTopic;

    before(() => {
      const MockTopicRepository = {
        find: (field, value) => {
          return Promise.resolve({
            dataValues: {
              name: 'Test Topic 2'
            }
          })
        }
      }

      createTopic = new CreateTopic({ topicRepository: MockTopicRepository });
    })

    it('will throw an error', async () => {
      try {
        await createTopic.execute({ name: 'Test Topic 2' });
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('topic already exists.');
      }
    })
  })

  context('topicRepository.create() error', () => {
    let createTopic;

    before(() => {
      const MockTopicRepository = {
        find: (field, value) => {
          return null
        },
        create: (data) => {
          throw new Error('random error')
        }
      }

      createTopic = new CreateTopic({ topicRepository: MockTopicRepository });
    })

    it('will throw an error', async () => {
      try {
        await createTopic.execute({ name: 'Test Topic 2' });
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('random error');
      }
    })
  })
});
