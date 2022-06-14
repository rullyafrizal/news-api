const { attributes } = require('structure');

const Topic = attributes({
  id: Number,
  name: String
})(class Topic {});

module.exports = Topic;
