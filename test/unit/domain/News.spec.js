const { expect } = require('chai');
const News = require('src/domain/News');

const { news: newsMock } = require('test/support/mock');

describe('Domain :: News', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const news = new News(newsMock);

      expect(news.toJSON().id).to.equal(newsMock.id);
      expect(news.toJSON().title).to.equal(newsMock.title);
      expect(news.toJSON().slug).to.equal(newsMock.slug);
      expect(news.toJSON().content).to.equal(newsMock.content);
      expect(news.toJSON().status).to.equal(newsMock.status);
      expect(news.toJSON().topicId).to.equal(newsMock.topicId);
      expect(news.toJSON().publishedAt).to.equal(newsMock.publishedAt);
      expect(news.toJSON().createdAt).to.equal(newsMock.createdAt);
      expect(news.toJSON().updatedAt).to.equal(newsMock.updatedAt);
    });
  });
});
