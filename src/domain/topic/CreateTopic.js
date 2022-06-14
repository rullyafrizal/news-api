const { attributes } = require('structure');

const CreateTopic = attributes({
  name: {
    type: String,
    required: true,
  }
})(class CreateTopic {});

module.exports = CreateTopic;
