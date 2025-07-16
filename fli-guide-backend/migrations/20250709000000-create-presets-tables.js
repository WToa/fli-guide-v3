"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();

      try {
         // Create quest_ranks table
         await queryInterface.createTable(
            "quest_ranks",
            {
               id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
               },
               name: {
                  type: Sequelize.STRING(50),
                  allowNull: false,
               },
            },
            { transaction }
         );
         
         // Create life_ranks table
         await queryInterface.createTable(
            "life_ranks",
            {
               id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
               },
               profession_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: {
                     model: "professions",
                     key: "id",
                  },
                  onUpdate: "CASCADE",
                  onDelete: "CASCADE",
               },
               quest_rank_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: {
                     model: "quest_ranks",
                     key: "id",
                  },
                  onUpdate: "CASCADE",
                  onDelete: "CASCADE",
               },
            },
            { transaction }
         );

         // Create bis_categories table
         await queryInterface.createTable(
            "bis_categories",
            {
               id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
               },
               name: {
                  type: Sequelize.STRING(100),
                  allowNull: false,
                  unique: true,
               },
            },
            { transaction }
         );

         // Create marco_ranks table
         await queryInterface.createTable(
            "marco_ranks",
            {
               id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
               },
               rank_number: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  unique: true,
               },
            },
            { transaction }
         );

         // Create recipe_life_ranks join table
         await queryInterface.createTable(
            "recipe_life_ranks",
            {
               recipe_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "recipes", key: "id" },
                  primaryKey: true,
               },
               life_rank_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "life_ranks", key: "id" },
                  primaryKey: true,
               },
            },
            { transaction }
         );

         // Create recipe_bis join table
         await queryInterface.createTable(
            "recipe_bis",
            {
               recipe_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "recipes", key: "id" },
                  primaryKey: true,
               },
               bis_category_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "bis_categories", key: "id" },
                  primaryKey: true,
               },
            },
            { transaction }
         );

         // Create recipe_marco join table with quantity
         await queryInterface.createTable(
            "recipe_marco",
            {
               recipe_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "recipes", key: "id" },
                  primaryKey: true,
               },
               marco_rank_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: "marco_ranks", key: "id" },
                  primaryKey: true,
               },
               quantity: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  defaultValue: 1,
               },
            },
            { transaction }
         );

         await transaction.commit();
      } catch (err) {
         await transaction.rollback();
         throw err;
      }
   },

   async down(queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();
      try {
         await queryInterface.dropTable("recipe_marco", { transaction });
         await queryInterface.dropTable("recipe_bis", { transaction });
         await queryInterface.dropTable("recipe_life_ranks", { transaction });
         await queryInterface.dropTable("marco_ranks", { transaction });
         await queryInterface.dropTable("bis_categories", { transaction });
         await queryInterface.dropTable("life_ranks", { transaction });
         await transaction.commit();
      } catch (err) {
         await transaction.rollback();
         throw err;
      }
   },
};
