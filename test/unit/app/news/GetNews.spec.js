const { expect } = require('chai');

const { news: newsMock, topic: topicMock, tag: tagMock } = require('test/support/mock');
const GetNews = require('src/app/news/GetNews');
const {
  MockNewsRepository,
  MockTagRepository,
  MockTopicRepository
} = require('test/support/repositories/');

describe('App :: News :: GetNews', () => {
  context('should work properly', () => {
    let getNews;

    before(() => {
      const MockNewsRepository = {
        findWithIncludes: (field, value, includes) => {
          return Promise.resolve(newsMock);
        }
      }

      getNews = new GetNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should get news', async () => {
      const news = await getNews.execute(1);

      expect(news).to.be.an('object');
      expect(news).has.property('id');
    })
  })

  context('throw not found error', () => {
    let getNews;

    before(() => {
      const MockNewsRepository = {
        findWithIncludes: (field, value, includes) => {
          return Promise.resolve(null);
        }
      }

      getNews = new GetNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should catch not found error', async () => {
      try {
        await getNews.execute(1);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error).has.property('errors');
        expect(error.errors).to.be.an('array');
        expect(error.errors[0]).has.property('message');
        expect(error.errors[0].message).to.be.equal('news not found.');
        expect(error.errors[0]).has.property('path');
        expect(error.errors[0].path).to.be.an('array');
        expect(error.errors[0].path[0]).to.be.equal('id');
      }
    })
  })
})
