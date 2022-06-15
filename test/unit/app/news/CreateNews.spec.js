const { expect } = require('chai');

const { news: newsMock, topic: topicMock, tag: tagMock } = require('test/support/mock');
const CreateNews = require('src/app/news/CreateNews');

describe('App :: News :: CreateNews', () => {
  context('should work properly', () => {
    let createNews;

    before(() => {
      const MockNewsRepository = {
        create: (data) => {
          return Promise.resolve({
            dataValues: {
              ...newsMock
            },
            addTag: (tag) => {
              return Promise.resolve(tag);
            }
          })
        }
      }

      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve({
            dataValues: {
              ...topicMock
            }
          })
        }
      }

      const MockTagRepository = {
        findOrCreate: (data) => {
          return Promise.resolve({
            dataValues: {
              ...tagMock
            }
          })
        }
      }

      createNews = new CreateNews({
        newsRepository: MockNewsRepository,
        topicRepository: MockTopicRepository,
        tagRepository: MockTagRepository
      });
    })

    it('will create and return the news', async () => {
      const news = await createNews.execute({
        title: 'Test News',
        content: 'Test News Content',
        topicId: 1,
        status: 'published',
        tags: 'test, news',
        publishedAt: new Date()
      })

      expect(news).to.be.an('object');
      expect(news).to.have.property('id');
      expect(news).to.have.property('title');
      expect(news).to.have.property('content');
      expect(news).to.have.property('topicId');
      expect(news).to.have.property('status');
      expect(news).to.have.property('publishedAt');
      expect(news).to.have.property('slug');
    })
  })

  context('should throw a not found error', () => {
    let createNews;

    before(() => {
      const MockNewsRepository = {
        create: (data) => {
          return Promise.resolve({
            dataValues: {
              ...newsMock
            }
          })
        }
      }

      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve(null)
        }
      }

      const MockTagRepository = {
        findOrCreate: (data) => {
          return Promise.resolve({
            dataValues: {
              ...tagMock
            }
          })
        }
      }

      createNews = new CreateNews({
        newsRepository: MockNewsRepository,
        topicRepository: MockTopicRepository,
        tagRepository: MockTagRepository
      });
    });

    it('will throw a not found error', async () => {
      try {
        await createNews.execute({
          ...newsMock
        })
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('topic not found.');
        expect(error.errors).to.be.an('array');
      }
    })
  })

  context('should throw and catch an error', () => {
    let createNews;

    before(() => {
      const MockNewsRepository = {
        create: (data) => {
          return Promise.resolve(new Error('random error'))
        }
      }

      const MockTopicRepository = {
        findById: (id) => {
          return Promise.resolve({
            dataValues: {
              ...topicMock
            }
          })
        }
      }

      const MockTagRepository = {
        findOrCreate: (data) => {
          return Promise.resolve({
            dataValues: {
              ...tagMock
            }
          })
        }
      }

      createNews = new CreateNews({
        newsRepository: MockNewsRepository,
        topicRepository: MockTopicRepository,
        tagRepository: MockTagRepository
      });
    })
  })
})
