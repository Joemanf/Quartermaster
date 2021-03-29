'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionTag = sequelize.define('QuestionTag', {
    name: DataTypes.STRING
  }, {});
  QuestionTag.associate = function(models) {
    // associations can be defined here
  };
  return QuestionTag;
};