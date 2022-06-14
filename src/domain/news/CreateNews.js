const { attributes } = require('structure');

const CreateNews = attributes({
  id: Number,
  title: String,
  slug: String,
  content: String,
  status: String,
  topicId: Number,
  publishedAt: Date,
  tags: String,
})(class CreateNews {});

module.exports = CreateNews;
