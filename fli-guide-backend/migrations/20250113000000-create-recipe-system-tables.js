"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction();

      try {
         // 1. professions
         await queryInterface.createTable(
            "professions",
            {
               id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
               },
               name: {
                  type: Sequelize.STRING(50),
                  allowNull: false,
                  unique: true,
               },
            },
            { transaction }
         );

         // 2. recipe_ranks
         await queryInterface.createTable(
            "recipe_ranks",
            {
               id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
               },
               name: {
                  type: Sequelize.STRING(50),
                  allowNull: false,
                  unique: true,
               },
            },
            { transaction }
         );

         // 3. recipe_categories
         await queryInterface.createTable(
            "recipe_categories",
            {
               id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
               },
               name: {
                  type: Sequelize.STRING(50),
                  allowNull: false,
               },
               profession_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: {
                     model: "professions",
                     key: "id",
                  },
               },
               has_ranks: {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false,
               },
            },
            { transaction }
         );

         await queryInterface.addIndex("recipe_categories", ["profession_id"], {
            name: "profession_id",
            transaction,
         });

         // 4. recipes
         await queryInterface.createTable(
            "recipes",
            {
               id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
               },
               name: {
                  type: Sequelize.STRING(100),
                  allowNull: false,
               },
               category_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: {
                     model: "recipe_categories",
                     key: "id",
                  },
               },
               rank_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: {
                     model: "recipe_ranks",
                     key: "id",
                  },
               },
            },
            { transaction }
         );

         await queryInterface.addIndex("recipes", ["category_id"], {
            name: "category_id",
            transaction,
         });

         await queryInterface.addIndex("recipes", ["rank_id"], {
            name: "rank_id",
            transaction,
         });

         // 5. materials
         await queryInterface.createTable(
            "materials",
            {
               id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
               },
               name: {
                  type: Sequelize.STRING(100),
                  allowNull: false,
                  unique: true,
               },
               crafted_recipe_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: {
                     model: "recipes",
                     key: "id",
                  },
               },
            },
            { transaction }
         );

         await queryInterface.addIndex("materials", ["crafted_recipe_id"], {
            name: "crafted_recipe_id",
            transaction,
         });

         // 6. recipe_materials
         await queryInterface.createTable(
            "recipe_materials",
            {
               recipe_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  references: {
                     model: "recipes",
                     key: "id",
                  },
               },
               material_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  references: {
                     model: "materials",
                     key: "id",
                  },
               },
               quantity: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
               },
            },
            { transaction }
         );

         await queryInterface.addIndex("recipe_materials", ["material_id"], {
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
         // Drop tables in reverse order to satisfy foreign key constraints
         await queryInterface.dropTable("recipe_materials", { transaction });
         await queryInterface.dropTable("materials", { transaction });
         await queryInterface.dropTable("recipes", { transaction });
         await queryInterface.dropTable("recipe_categories", { transaction });
         await queryInterface.dropTable("recipe_ranks", { transaction });
         await queryInterface.dropTable("professions", { transaction });

         await transaction.commit();
      } catch (error) {
         await transaction.rollback();
         throw error;
      }
   },
};
