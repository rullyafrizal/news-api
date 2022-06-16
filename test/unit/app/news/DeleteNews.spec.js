const { expect } = require('chai');

const { news: newsMock, topic: topicMock, tag: tagMock } = require('test/support/mock');
const DeleteNews = require('src/app/news/DeleteNews');
const {
  MockNewsRepository,
  MockTagRepository,
  MockTopicRepository
} = require('test/support/repositories/');

describe('App :: News :: DeleteNews', () => {
  context('should work properly', () => {
    let deleteNews;

    before(() => {
      deleteNews = new DeleteNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should delete news', async () => {
      const news = await deleteNews.execute(1);

      expect(news).to.be.an('object');
      expect(news).has.property('id');
    })
  })

  context('throw a news not found error', () => {
    let deleteNews;

    before(() => {
      const MockNewsRepository = {
        findWithIncludes: (id, value, includes) => {
          return Promise.resolve(null);
        }
      }

      deleteNews = new DeleteNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should throw a news not found error', async () => {
      try {
        await deleteNews.execute(1);
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
