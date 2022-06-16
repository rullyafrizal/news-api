const { expect } = require('chai');
const { topic: topicMock } = require('test/support/mock');
const UpdateTopic = require('src/app/topic/UpdateTopic');

describe('App :: Topic :: UpdateTopic', () => {
  context('should work properly', () => {
    let updateTopic;

    before(() => {
      const MockTopicRepository = {
        update: (id, data) => {
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

      updateTopic = new UpdateTopic({
        topicRepository: MockTopicRepository
      })
    })

    it('will update and return the topic ids', async () => {
      const topic = await updateTopic.execute({
        id: 1,
        data: {
          name: topicMock.name
        }
      })

      expect(topic).to.be.an('object');
      expect(topic).to.have.property('id');
      expect(topic.id).to.be.an('array');
      expect(topic.id).to.have.lengthOf(1);
    })
  })

  context('will throw a not found error', () => {
    let updateTopic;

    before(() => {
      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve(null)
        }
      }

      updateTopic = new UpdateTopic({
        topicRepository: MockTopicRepository
      })
    })

    it('will throw an error', async () => {
      try {
        await updateTopic.execute({
          id: 1,
          data: {
            name: topicMock.name
          }
        })
      } catch (error) {
        expect(error).to.be.an('error');
      }
    })
  })

  context('will throw and catch an error', () => {
    let updateTopic;

    before(() => {
      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve({
            dataValues: {
              ...topicMock
            }
          })
        },
        update: (id, data) => {
          return Promise.reject(new Error('random error'))
        }
      }

      updateTopic = new UpdateTopic({
        topicRepository: MockTopicRepository
      })
    })

    it('will catch random error', async () => {
      try {
        await updateTopic.execute({
          id: 1,
          data: {
            name: topicMock.name
          }
        })
      } catch (error) {
        expect(error).to.be.an('error');
      }
    })
  })
})
