const { expect } = require('chai');

const { news: newsMock, topic: topicMock, tag: tagMock } = require('test/support/mock');
const UpdateNews = require('src/app/news/UpdateNews');
const {
  MockNewsRepository,
  MockTagRepository,
  MockTopicRepository
} = require('test/support/repositories/');

describe('App :: News :: UpdateNews', () => {
  context('should work properly', () => {
    let updateNews;

    before(() => {
      updateNews = new UpdateNews({
        newsRepository: MockNewsRepository,
        tagRepository: MockTagRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should update news', async () => {
      const news = await updateNews.execute(1, {
        title: 'title',
        content: 'content',
        topicId: 1,
        publishedAt: '2018-01-01',
        status: 'published',
        tags: 'tag1,tag2'
      });

      expect(news).to.be.an('array');
    })
  })

  context('should throw news not found error', () => {
    let updateNews;

    before(() => {
      const MockNewsRepository = {
        findById: () => {
          return Promise.resolve(null);
        }
      }

      updateNews = new UpdateNews({
        newsRepository: MockNewsRepository
      })
    })

    it('should throw news not found error', async () => {
      try {
        await updateNews.execute(1, {
          title: 'title',
          content: 'content',
          topicId: 1,
          publishedAt: '2018-01-01',
          status: 'published',
          tags: 'tag1,tag2'
        });
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('news not found.');
      }
    })
  })

  context('should throw topic not found error', () => {
    let updateNews;

    before(() => {
      const MockNewsRepository = {
        findById: () => {
          return Promise.resolve({
            dataValues: {
              ...newsMock
            }
          });
        }
      }

      const MockTopicRepository = {
        findById: () => {
          return Promise.resolve(null);
        }
      }

      updateNews = new UpdateNews({
        newsRepository: MockNewsRepository,
        topicRepository: MockTopicRepository
      })
    })

    it('should throw topic not found error', async () => {
      try {
        await updateNews.execute(1, {
          title: 'title',
          content: 'content',
          topicId: 1,
          publishedAt: '2018-01-01',
          status: 'published',
          tags: 'tag1,tag2'
        });
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('topic not found.');
      }
    })
  })
})
