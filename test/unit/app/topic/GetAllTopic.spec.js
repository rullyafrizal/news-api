const { expect } = require('chai');
const { topic: topicMock } = require('test/support/mock');
const GetAllTopic = require('src/app/topic/GetAllTopic');

describe('App :: Topic :: GetAllTopic', () => {
  context('should work properly', () => {
    let getAllTopic;

    before(() => {
      const MockTopicRepository = {
        findAll: () => {
          return Promise.resolve([
            {
              dataValues: {
                ...topicMock
              }
            }
          ]);
        }
      };

      getAllTopic = new GetAllTopic({ topicRepository: MockTopicRepository });
    })

    it('will return the topic', async () => {
      const topics = await getAllTopic.execute();

      expect(topics).to.be.an('array');
      expect(topics[0]).to.be.an('object');
    })
  })

  context('should throw error', () => {
    let getAllTopic;

    before(() => {
      const MockTopicRepository = {
        findAll: () => {
          throw new Error('error');
        }
      };

      getAllTopic = new GetAllTopic({ topicRepository: MockTopicRepository });
    })

      it('will throw error', async () => {
        try {
          await getAllTopic.execute();
        } catch (error) {
          expect(error).to.be.an('error');
        }
      })
  })
})
