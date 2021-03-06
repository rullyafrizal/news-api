'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.models.NewsModel, {
        foreignKey: 'topicId',
        as: 'news',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Topic.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topic',
    tableName: 'topics',
    timestamps: false
  });
  return Topic;
};
