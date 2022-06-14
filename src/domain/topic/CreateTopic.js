const { attributes } = require('structure');

const CreateTopic = attributes({
  name: String
})(class CreateTopic {});

module.exports = CreateTopic;
