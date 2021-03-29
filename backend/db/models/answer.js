'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    name: DataTypes.STRING
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};