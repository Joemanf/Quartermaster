'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Question.associate = function (models) {
    // associations can be defined here
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
    Question.belongsTo(models.User, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'QuestionTag', // This is the model name referencing the join table.
      otherKey: 'tagId',
      foreignKey: 'questionId'
    }
    Question.belongsToMany(models.Tag, columnMapping);

  };
  return Question;
};