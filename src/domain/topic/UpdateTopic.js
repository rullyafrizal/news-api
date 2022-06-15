const { attributes } = require('structure');

const UpdateTopic = attributes({
  name: {
    type: String,
    required: true,
  }
})(class UpdateTopic {});

module.exports = UpdateTopic;
