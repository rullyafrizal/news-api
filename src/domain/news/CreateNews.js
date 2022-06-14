const { attributes } = require('structure');
const slugify = require('slugify');
const SanitizeHtml = require('sanitize-html');

const CreateNews = attributes({
  title: String,
  content: String,
  status: String,
  topicId: Number,
  publishedAt: Date,
  tags: String,
})(class CreateNews {
  getNewsRequest() {
    this.status = this.status.toUpperCase();
    this.slug = slugify(this.title, { lower: true });
    this.content = SanitizeHtml(this.content);

    return {
      title: this.title,
      slug: this.slug,
      content: this.content,
      status: this.status,
      topicId: this.topicId,
      publishedAt: this.publishedAt,
      tags: this.tags ? this.tags.split(',').map(tag => tag.trim()) : [],
    };
  }
});

module.exports = CreateNews;
