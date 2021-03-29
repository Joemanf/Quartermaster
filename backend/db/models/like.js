'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    name: DataTypes.STRING
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};