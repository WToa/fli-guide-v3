const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

// Core models
const MaterialModel = require("./recipe_calculator_core/material");
const MaterialSourceModel = require("./presets/materialSource");
const ProfessionModel = require("./recipe_calculator_core/profession");
const RecipeCategoryModel = require("./recipe_calculator_core/recipeCategory");
const RecipeModel = require("./recipe_calculator_core/recipe");
const RecipeMaterialModel = require("./joins/recipeMaterials");
const RecipeRankModel = require("./recipe_calculator_core/recipeRank");

// Preset models
const LifeRankModel = require("./presets/lifeRank");
const BisCategoryModel = require("./presets/bisCategory");
const MarcoRankModel = require("./presets/marcoRank");
const QuestRankModel = require("./presets/questRank");

// Join table models
const RecipeMarcoModel = require("./joins/recipeMarco");
const RecipeLifeRanksModel = require("./joins/recipeLifeRanks");
const RecipeBisModel = require("./joins/recipeBis"); // ✅ Import the new join model

const db = {};

// Sequelize instance
db.sequelize = sequelize;

// Model definitions
db.Material = MaterialModel(sequelize, DataTypes);
db.MaterialSources = MaterialSourceModel(sequelize, DataTypes);
db.Profession = ProfessionModel(sequelize, DataTypes);
db.RecipeCategory = RecipeCategoryModel(sequelize, DataTypes);
db.Recipe = RecipeModel(sequelize, DataTypes);
db.RecipeMaterial = RecipeMaterialModel(sequelize, DataTypes);
db.RecipeRank = RecipeRankModel(sequelize, DataTypes);
db.LifeRank = LifeRankModel(sequelize, DataTypes);
db.BisCategory = BisCategoryModel(sequelize, DataTypes);
db.MarcoRank = MarcoRankModel(sequelize, DataTypes);
db.QuestRank = QuestRankModel(sequelize, DataTypes);
db.RecipeMarco = RecipeMarcoModel(sequelize, DataTypes);
db.RecipeLifeRanks = RecipeLifeRanksModel(sequelize, DataTypes);
db.RecipeBis = RecipeBisModel(sequelize, DataTypes); // ✅ Define the new join model

// Core associations
db.Material.hasMany(db.RecipeMaterial, { foreignKey: "material_id" });
db.Material.hasMany(db.MaterialSources, { foreignKey: "material_id" });
db.MaterialSources.belongsTo(db.Material, { foreignKey: "material_id" });
db.Profession.hasMany(db.RecipeCategory, { foreignKey: "profession_id" });
db.RecipeCategory.belongsTo(db.Profession, { foreignKey: "profession_id" });
db.RecipeCategory.hasMany(db.Recipe, { foreignKey: "category_id" });
db.Recipe.belongsTo(db.RecipeCategory, { foreignKey: "category_id" });
db.Recipe.belongsTo(db.RecipeRank, { foreignKey: "rank_id" });
db.Recipe.hasMany(db.RecipeMaterial, { foreignKey: "recipe_id" });
db.RecipeMaterial.belongsTo(db.Recipe, { foreignKey: "recipe_id" });
db.RecipeMaterial.belongsTo(db.Material, { foreignKey: "material_id" });
db.RecipeRank.hasMany(db.Recipe, { foreignKey: "rank_id" });

// Preset-related associations
db.Recipe.belongsToMany(db.LifeRank, {
   through: db.RecipeLifeRanks, // ✅ Corrected: Use the model
   foreignKey: "recipe_id",
   otherKey: "life_rank_id",
});
db.LifeRank.belongsToMany(db.Recipe, {
   through: db.RecipeLifeRanks, // ✅ Corrected: Use the model
   foreignKey: "life_rank_id",
   otherKey: "recipe_id",
});

db.Recipe.belongsToMany(db.BisCategory, {
   through: db.RecipeBis, // ✅ Corrected: Use the model
   foreignKey: "recipe_id",
   otherKey: "bis_category_id",
});
db.BisCategory.belongsToMany(db.Recipe, {
   through: db.RecipeBis, // ✅ Corrected: Use the model
   foreignKey: "bis_category_id",
   otherKey: "recipe_id",
});

db.Recipe.belongsToMany(db.MarcoRank, {
   through: db.RecipeMarco, // This one was already correct
   foreignKey: "recipe_id",
   otherKey: "marco_rank_id",
});
db.MarcoRank.belongsToMany(db.Recipe, {
   through: db.RecipeMarco, // This one was already correct
   foreignKey: "marco_rank_id",
   otherKey: "recipe_id",
});

// Direct associations for join table models
db.Recipe.hasMany(db.RecipeMarco, { foreignKey: "recipe_id" });
db.RecipeMarco.belongsTo(db.Recipe, { foreignKey: "recipe_id" });
db.RecipeMarco.belongsTo(db.MarcoRank, { foreignKey: "marco_rank_id" });
db.LifeRank.belongsTo(db.QuestRank, { foreignKey: "quest_rank_id" });
db.QuestRank.hasMany(db.LifeRank, { foreignKey: "quest_rank_id" });

module.exports = db;