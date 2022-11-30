'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
   await queryInterface.bulkInsert('products', [
    {
      id: 2,
      name: "jknf",
      price: 12,
      image: "'http://localhost:3000/public\\images\\product\\1666943157900_Ảnh chụp màn hình 2022-09-16 000424.png'",
      discount: "No",
      feature: "No",
      description: "dfg",
      createdAt: "2022-10-28 07:45:57",
      updatedAt: "2022-10-28 07:45:57",
      index_categories: 1,
      index_production: 1
    },
    {
      id: 3,
      name: "jknf",
      price: 12,
      image: "'http://localhost:3000/public\\images\\product\\1666943167941_Ảnh chụp màn hình 2022-09-16 000424.png'",
      discount: "No",
      feature: "Yes",
      description: "dfg",
      createdAt: "'2022-10-28 07:46:07'",
      updatedAt: "2022-10-28 07:46:07",
      index_categories: 1,
      index_production: 1

    },
   { 
    id: 4,
    name: "jknf",
    price: 717600,
    image: "'http://localhost:3000/public\\images\\product\\1667030054725_cat-thuy-tinh-meowcat-5l-huong-chanh.png'",
    discount: "8%",
    feature: "Yes",
    description: "dfg",
    createdAt: "2022-10-29 07:54:14",
    updatedAt: "2022-10-29 07:54:14",
    index_categories: 1,
    index_production: 1
  },
  {
    id: 5,
    name: "CÁT THUỶ TINH MEOWCAT 5L 1. Thông tin sản phẩm Cát thuỷ tinh ",
    price: 700600,
    image: "'http://localhost:3000/public\\images\\product\\1667030291695_dodung.png'",
    discount: "8%",
    feature: "Yes",
    description: "dfgCÁT THUỶ TINH MEOWCAT ",
    createdAt: "2022-10-29 07:58:11",
    updatedAt: "2022-10-29 07:58:11",
    index_categories: 1,
    index_production: 2
  }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
