const { expect } = require('chai');
const { topic: topicMock } = require('test/support/mock');
const Delete = require('src/app/topic/DeleteTopic');

describe('App :: Topic :: DeleteTopic', () => {
  context('should work properly', () => {
    let deleteTopic;

    before(() => {
      const MockTopicRepository = {
        destroy: (id) => {
          return Promise.resolve([
            id
          ]);
        },
        findById: (id) => {
          return Promise.resolve({
            dataValues: {
              ...topicMock
            }
          })
        }
      }

      deleteTopic = new Delete({
        topicRepository: MockTopicRepository
      })
    })

    it('will delete and return the topic ids', async () => {
      const topic = await deleteTopic.execute({
        id: 1
      })

      expect(topic).to.be.an('object');
      expect(topic).to.have.property('id');
    })
  })

  context('will throw a not found error', () => {
    let deleteTopic;

    before(() => {
      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve(null)
        }
      }

      deleteTopic = new Delete({
        topicRepository: MockTopicRepository
      })
    })

    it('will throw an error', async () => {
      try {
        await deleteTopic.execute({
          id: 1
        })
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.errors).to.be.an('array');
        expect(error.message).to.be.equal('topic not found.');
      }
    })
  })
})
