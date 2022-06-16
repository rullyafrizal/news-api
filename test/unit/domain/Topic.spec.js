const { expect } = require('chai');
const Topic = require('src/domain/Topic');

const { topic: topicMock } = require('test/support/mock');

describe('Domain :: Topic', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const topic = new Topic(topicMock);

      expect(topic.toJSON().id).to.equal(topicMock.id);
      expect(topic.toJSON().name).to.equal(topicMock.name);
    });
  });
});
