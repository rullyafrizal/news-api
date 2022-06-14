const { attributes } = require('structure');

const Tag = attributes({
  id: Number,
  name: String
})(class Tag {});

module.exports = Tag;
