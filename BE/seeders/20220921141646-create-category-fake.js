'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('categories',
      [{
        name: 'John Doe',
      
         createdAt:"2022-09-22 3:21:21",
         updatedAt:"2022-09-23 3:21:21",
       },
       {name: 'John',
  
       createdAt:"2022-09-22 3:21:21",

       updatedAt:"2022-09-23 3:21:21",

      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
