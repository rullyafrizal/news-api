const { expect } = require('chai');

const { news: newsMock, topic: topicMock, tag: tagMock } = require('test/support/mock');
const GetAllNews = require('src/app/news/GetAllNews');
const {
  MockNewsRepository,
  MockTagRepository,
  MockTopicRepository
} = require('test/support/repositories/');

describe('App :: News :: GetAllNews', () => {
  context('should work properly', () => {
    let getAllNews;

    before(() => {
      getAllNews = new GetAllNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should get all news', async () => {
      const news = await getAllNews.execute({ topic: 'crypto' });

      expect(news).to.be.an('array');
    })
  })

  context('throw and catch error', () => {
    let getAllNews;

    before(() => {
      getAllNews = new GetAllNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should catch error', async () => {
      try {
        await getAllNews.execute(undefined);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error).has.property('message');
      }
    })
  })
})
