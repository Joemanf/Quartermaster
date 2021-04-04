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
    return queryInterface.bulkInsert('Answers', [
      {
        body: `Compulsions, morale effects, phantasms, and patterns), paralysis, Poison, sleep, stun, and any effect that requires a Fortitude save (unless the effect also works on objects or is harmless). Undead are not subject to ability drain, Energy Drain, or Nonlethal Damage. Undead are immune to Damage or penalties to their physical ability scores (Strength, Dexterity, and Constitution), as well as to fatigue and exhaustion effects. Undead are not at risk of death from massive Damage.`,
        userId: 8, //1,
        questionId: 1,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `The base walking speed for a Dwarf character is 25 feet.`,
        userId: 8, //2,
        questionId: 2,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `Both are based in a futuristic cyberpunk type setting but Shadowrun has more basis in fantasy with magic. Shadowrun features more of the classic fantasy races like Orcs and Elves. Cyberpunk focuses more on technology and has more of a basis in reality. The only playable race is human and there is no magic involved.`,
        userId: 14, //3,
        questionId: 3,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `Currently there are 28 adventure paths. There are also numerous one-off and module adventures.`,
        userId: 7, //4,
        questionId: 4,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `There is an action called a guarded step which takes the place of the 5-foot-step. It is a move action now and no longer a free action like in Pathfinder.`,
        userId: 6, //5,
        questionId: 5,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `Yes, the MLP RPG is called, "My Little Pony: Tails From Equestria."`,
        userId: 7, //6,
        questionId: 6,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `The names of the continents are as follows: Arcadia, Avistan, Garund, Azlant, Sarusan, Casmaron, and Tian-Xia. There is another area called the Crown of the World that is used for trade between Avistan and Tian-Xia.`,
        userId: 8, //7,
        questionId: 7,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `The game is a D6 system and uses only a D6 (Six-sided die) for everything.`,
        userId: 5, //8,
        questionId: 8,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `The game Call of Cthulhu is a horror/investigation game. So if your keeper is doing it right it should be scary, or at least suspenseful.`,
        userId: 4, //9,
        questionId: 9,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        body: `No.`,
        userId: 4, //10,
        questionId: 10,
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
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
