const { expect } = require('chai');
const UpdateTopic = require('src/domain/topic/UpdateTopic');

describe('Domain :: Auth :: UpdateTopic', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const topic = new UpdateTopic({
        name: 'Test Topic',
      });

      expect(topic.toJSON().name).to.equal('Test Topic');
    });
  });

  context('validation', () => {
    it('should fail when all fields are not provided or empty', () => {
      const data = new UpdateTopic({});
      const { valid, errors } = data.validate({});

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors).to.have.length(1);
    });
  });
});
