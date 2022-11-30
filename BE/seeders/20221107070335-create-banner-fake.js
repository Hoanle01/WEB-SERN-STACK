'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
   await queryInterface.bulkInsert('People', [
    {
      id: 1,
      name: "banner1",
      status: "active",
      image: "http://localhost:3000/public\\images\\banner\\1667655247806_banner.png",
      createdAt: "2022-10-29 07:58:11",
      updatedAt: "2022-10-29 07:58:11",
  },
  {
      id: 2,
      name: "banner2",
      status: "active",
      image: "http://localhost:3000/public\\images\\banner\\1667655269359_banner2.jpg",
      createdAt: "2022-10-29 07:54:14",
      updatedAt: "2022-10-29 07:54:14",
  },
  {
      id: 4,
      name: "banner3",
      status: "active",
      image: "http://localhost:3000/public\\images\\banner\\1667655316407_banner3.jpg",
      createdAt: "'2022-10-28 07:46:07'",
      updatedAt: "2022-10-28 07:46:07",
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
