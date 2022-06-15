const { expect } = require('chai');
const UpdateNews = require('src/domain/news/UpdateNews');

describe('Domain :: Auth :: UpdateNews', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const news = new UpdateNews({
        title: 'Test News',
        content: 'Test Content',
        status: 'published',
        topicId: 1,
        publishedAt: new Date(),
        tags: "1,2,3",
      });

      expect(news.toJSON().title).to.equal('Test News');
      expect(news.toJSON().content).to.equal('Test Content');
      expect(news.toJSON().status).to.equal('published');
      expect(news.toJSON().topicId).to.equal(1);
      expect(news.toJSON().publishedAt).to.be.an('date');
      expect(news.toJSON().tags).to.equal("1,2,3");
    });
  });

  context('mutate fields', () => {
    it('should return data properly', () => {
      const news = new UpdateNews({
        title: 'Test News',
        content: 'Test Content',
        status: 'published',
        topicId: 1,
        publishedAt: new Date(),
        tags: "1,2,3",
      });

      const mutated = news.getNewsRequest()

      expect(mutated.title).to.equal('Test News');
      expect(mutated.slug).to.equal('test-news');
      expect(mutated.content).to.equal('Test Content');
      expect(mutated.status).to.equal('PUBLISHED');
      expect(mutated.topicId).to.equal(1);
      expect(mutated.publishedAt).to.be.an('date');
      expect(mutated.tags).to.be.an("array");
    })
  });

  context('validation', () => {
    it('should fail when all fields are not provided or empty', () => {
      const data = new UpdateNews({});
      const { valid, errors } = data.validate({});

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors).to.have.length(5);
    });
  });

  context('tags split and trim', () => {
    it('should fail because tags is not a string', () => {
      const data = new UpdateNews({
        title: 'Test News',
        content: 'Test Content',
        status: 'published',
        topicId: 1,
        publishedAt: new Date(),
        tags: undefined,
      });

      try {
        data.getNewsRequest();
      } catch (e) {
        expect(e).to.be.an('error');
      }
    })
  })

  context('slugify on null', () => {
    it('should fail because slugify on null object', () => {
      const data = new UpdateNews({
        title: null,
        content: undefined,
        status: 'published',
        topicId: 1,
        publishedAt: new Date(),
        tags: "1,2,3",
      });

      try {
        data.getNewsRequest();
      } catch (e) {
        expect(e).to.be.an('error');
      }
    })
  })
});
