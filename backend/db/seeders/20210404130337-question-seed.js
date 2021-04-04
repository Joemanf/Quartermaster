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
    return queryInterface.bulkInsert('Questions', [
      {
        title: 'What are the undead immunities in pathfinder 1e?',
        body: 'Me and my friends are playing Pathfinder 1e, and we were curious about this',
        userId: 2, //1
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `What’s the normal land speed for a dwarf character in 5e?`,
        body: `I can't find it in the book`,
        userId: 3, //2
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `What's the difference between Shadowrun and Cyberpunk Red?`,
        body: `They look the same`,
        userId: 14, //3
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `How many pre-written Pathfinder Adventure Paths are there?`,
        body: `My friend says there's over 50 but I don't believe that`,
        userId: 13, //4
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `Is there a 5-foot-step in Starfinder?`,
        body: `If not then I think there should be`,
        userId: 12, //5
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `Is there a My Little Pony RPG?`,
        body: `I want to play in Equestria`,
        userId: 11, //6
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `What are the names of the continents in Golarion?`,
        body: `This question is for Pathfinder. Me and my group can't find a concise description of all the continents of Golarion. Is this suppose to be for mysterious effect? Please help!`,
        userId: 12, //7
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `What dice are used in the RPG Traveller?`,
        body: `Like is it mostly d20 or is it something weird`,
        userId: 10, //8
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `Is Call of Cthulhu scary?`,
        body: `I'm not sure if it's suppose to be like an action game or a scary one (or both?).`,
        userId: 9, //9
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: `Do Dungeons and Dragons players worship Satan and sacrifice animals in his name?`,
        body: `https://www.youtube.com/watch?app=desktop&v=kDJ1UOpxjt4&ab_channel=LadySorrowIshana I found this video on youtube and it's really scaring me`,
        userId: 15, //10
        createdAt: new Date(), updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
