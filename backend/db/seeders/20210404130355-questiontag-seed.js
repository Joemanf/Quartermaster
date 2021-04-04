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
    return queryInterface.bulkInsert('QuestionTags', [
      { questionId: 1, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 2, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 3, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 3, tagId: 6, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 4, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 4, tagId: 4, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 5, tagId: 7, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 6, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 7, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 7, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 7, tagId: 4, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 7, tagId: 7, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 8, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 9, tagId: 9, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 10, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { questionId: 10, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('QuestionTags', null, {});
  }
};
