const { expect } = require('chai');
const CreateTopic = require('src/domain/topic/CreateTopic');

describe('Domain :: Auth :: CreateTopic', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const topic = new CreateTopic({
        name: 'Test Topic',
      });

      expect(topic.toJSON().name).to.equal('Test Topic');
    });
  });

  context('validation', () => {
    it('should fail when all fields are not provided or empty', () => {
      const data = new CreateTopic({});
      const { valid, errors } = data.validate({});

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors).to.have.length(1);
    });
  });
});
