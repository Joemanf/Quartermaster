'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        // return queryInterface.createTable('Users', {
        //     // id: {
        //     //     allowNull: false,
        //     //     autoIncrement: true,
        //     //     primaryKey: true,
        //     //     type: Sequelize.INTEGER
        //     // },
        //     // // username: {
        //     // //     allowNull: false,
        //     // //     unique: true,
        //     // //     type: Sequelize.STRING(50)
        //     // // },
        //     // // email: {
        //     // //     allowNull: false,
        //     // //     unique: true,
        //     // //     type: Sequelize.STRING
        //     // // },
        //     // // hashedPassword: {
        //     // //     allowNull: false,
        //     // //     type: Sequelize.STRING.BINARY
        //     // // },
        //     // // avatar: {
        //     // //     type: Sequelize.STRING
        //     // // },
        //     // createdAt: {
        //     //     allowNull: false,
        //     //     defaultValue: Sequelize.fn('now'),
        //     //     type: Sequelize.DATE
        //     // },
        //     // updatedAt: {
        //     //     allowNull: false,
        //     //     defaultValue: Sequelize.fn('now'),
        //     //     type: Sequelize.DATE
        //     // }
        // });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};