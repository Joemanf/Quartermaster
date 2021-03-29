'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: {
        allowNull: false,
        references: { model: "Questions" },
        type: Sequelize.INTEGER
      },
      tagId: {
        allowNull: false,
        references: { model: "Tags" },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QuestionTags');
  }
};