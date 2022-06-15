const { attributes } = require('structure');
const slugify = require('slugify');
const SanitizeHtml = require('sanitize-html');

const UpdateNews = attributes({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  topicId: {
    type: Number,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  tags: {
    type: String,
    required: false,
  },
})(class UpdateNews {
  getNewsRequest() {
    try {
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
        tags: this.tags ?
          this.tags.split(',').map(tag => tag.trim()) :
          [],
      };
    } catch (e) {
      throw new Error(e);
    }
  }
});

module.exports = UpdateNews;
