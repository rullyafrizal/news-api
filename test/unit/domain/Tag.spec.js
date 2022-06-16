const { expect } = require('chai');
const Tag = require('src/domain/Tag');

const { tag: tagMock } = require('test/support/mock');

describe('Domain :: Tag', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const tag = new Tag(tagMock);

      expect(tag.toJSON().id).to.equal(tagMock.id);
      expect(tag.toJSON().name).to.equal(tagMock.name);
    });
  });
});
