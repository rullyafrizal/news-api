'use strict';
const {
  Model
} = require('sequelize');

const { Topic } = require('./index')

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.models.TopicModel, {
        foreignKey: 'topicId',
        as: 'topic',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      this.belongsToMany(models.models.TagModel, {
        through: 'news_tags',
        as: 'tags',
        foreignKey: 'newsId',
        otherKey: 'tagId',
        timestamps: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  News.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.ENUM('PUBLISHED', 'DRAFT', 'DELETED'),
    topicId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    publishedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'news',
  });

  return News;
};
