'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('news_tags', {
      newsId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'news'
          },
          key: 'id'
        },
        allowNull: false
      },
      tagId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'tags'
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('news_tags');
  }
};
