const { attributes } = require('structure');

const News = attributes({
  id: Number,
  title: String,
  slug: String,
  content: String,
  status: String,
  topicId: Number,
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
})(class News {});

module.exports = News;
