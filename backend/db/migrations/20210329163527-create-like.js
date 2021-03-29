'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: { model: "Users" },
        unique: "like_unique_constraint",
        type: Sequelize.INTEGER
      },
      likeableId: {
        references: null,
        unique: "like_unique_constraint",
        type: Sequelize.INTEGER
      },
      likeableType: {
        unique: "like_unique_constraint",
        type: Sequelize.STRING
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
    },
      {
        uniqueKeys: {
          like_unique_constraint: {
            fields: ["userId", "likeableId", "likeableType"]
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};
