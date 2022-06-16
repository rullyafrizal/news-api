const GetTopic = require('src/app/topic/GetTopic');
const { expect } = require('chai');
const { topic: topicMock } = require('test/support/mock');

describe('App :: Topic :: GetTopic', () => {
  context('should work properly', () => {
    let getTopic;

    before(() => {
      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve({
            dataValues: {
              ...topicMock
            }
          });
        },
      };

      getTopic = new GetTopic({ topicRepository: MockTopicRepository });
    })

    it('will return the topic', async () => {
      const topic = await getTopic.execute({ id: topicMock.id });

      expect(topic).to.be.an('object');
      expect(topic).to.have.property('id');
      expect(topic.id).to.be.equal(topicMock.id);
      expect(topic).to.have.property('name');
      expect(topic.name).to.be.equal(topicMock.name);
    })
  })

  context('should throw not found error', () => {
    let getTopic;

    before(() => {
      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve(null);
        }
      };

      getTopic = new GetTopic({ topicRepository: MockTopicRepository });
    })

    it('will throw not found error', async () => {
      try {
        await getTopic.execute({ id: topicMock.id });
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('topic not found.');
        expect(error.errors).to.be.an('array');
      }
    })
  })
})
