'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.models.NewsModel, {
        through: 'news_tags',
        as: 'news',
        foreignKey: 'tagId',
        otherKey: 'newsId',
        timestamps: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false
  });
  return Tag;
};
