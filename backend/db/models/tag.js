'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Tag.associate = function (models) {
    // associations can be defined here
    const columnMapping1 = {
      through: 'QuestionTag', // This is the model name referencing the join table.
      otherKey: 'questionId',
      foreignKey: 'tagId'
    }
    Tag.belongsToMany(models.Question, columnMapping1);

    const columnMapping2 = {
      through: 'UserTag', // This is the model name referencing the join table.
      otherKey: 'userId',
      foreignKey: 'tagId'
    }
    Tag.belongsToMany(models.User, columnMapping2);
  };
  return Tag;
};