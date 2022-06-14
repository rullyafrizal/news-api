const { attributes } = require('structure');

const UpdateTopic = attributes({
  name: String
})(class UpdateTopic {});

module.exports = UpdateTopic;
