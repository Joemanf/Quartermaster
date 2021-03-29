'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Tag.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: 'QuestionTag', // This is the model name referencing the join table.
      otherKey: 'questionId',
      foreignKey: 'tagId'
    }
    Tag.belongsToMany(models.Question, columnMapping);
  };
  return Tag;
};