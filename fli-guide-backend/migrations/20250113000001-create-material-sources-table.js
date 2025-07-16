"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();

      try {
         await queryInterface.createTable(
            "material_sources",
            {
               id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
               },
               material_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: {
                     model: "materials",
                     key: "id",
                  },
               },
               collection_type: {
                  type: Sequelize.STRING(50),
                  allowNull: true,
               },
               profession_name: {
                  type: Sequelize.STRING(50),
                  allowNull: true,
               },
               map_name: {
                  type: Sequelize.STRING(50),
                  allowNull: true,
               },
               target_name: {
                  type: Sequelize.STRING(100),
                  allowNull: true,
               },
            },
            { transaction }
         );

         await queryInterface.addIndex("material_sources", ["material_id"], {
            name: "material_id",
            transaction,
         });

         await transaction.commit();
      } catch (error) {
         await transaction.rollback();
         throw error;
      }
   },

   async down(queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();

      try {
         await queryInterface.dropTable("material_sources", { transaction });
         await transaction.commit();
      } catch (error) {
         await transaction.rollback();
         throw error;
      }
   },
};
