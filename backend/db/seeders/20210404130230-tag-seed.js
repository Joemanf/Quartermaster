'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Tags', [
      { name: 'General', createdAt: new Date(), updatedAt: new Date() }, //1
      { name: 'D&D 5e', createdAt: new Date(), updatedAt: new Date() }, //2
      { name: 'Pathfinder 1e', createdAt: new Date(), updatedAt: new Date() }, //3
      { name: 'Pathfinder 2e', createdAt: new Date(), updatedAt: new Date() }, //4
      { name: 'Shadowrun', createdAt: new Date(), updatedAt: new Date() }, //5
      { name: 'Cyberpunk Red', createdAt: new Date(), updatedAt: new Date() }, //6
      { name: 'Starfinder', createdAt: new Date(), updatedAt: new Date() }, //7
      { name: 'Traveller', createdAt: new Date(), updatedAt: new Date() }, //8
      { name: 'Call of Cthulhu', createdAt: new Date(), updatedAt: new Date() }, //9
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
