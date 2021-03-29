'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserTag = sequelize.define('UserTag', {
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        tagId: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    });
    UserTag.associate = function (models) {
        // associations can be defined here
    };
    return UserTag;
};