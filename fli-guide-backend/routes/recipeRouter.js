const express = require("express");
const {
   getProfessions,
   getCategories,
   getRanks,
   getRecipes,
   getRecipeBreakdown,
   searchRecipes,
   getLifeRanks,
   getBisCategories,
   getMarcoRanks,
   getQuestRanks,
   searchMaterials,
} = require("../controllers/recipeController");

const router = express.Router();

router.get("/professions", getProfessions);
router.get("/categories", getCategories);
router.get("/ranks", getRanks);
router.get("/recipes", getRecipes);
router.get("/recipe-breakdown/:recipeId", getRecipeBreakdown);
router.get("/search-recipes", searchRecipes);

// Preset endpoints
router.get("/life-ranks", getLifeRanks);
router.get("/bis-categories", getBisCategories);
router.get("/marco-ranks", getMarcoRanks);
router.get("/quest-ranks", getQuestRanks);
router.get("/search-materials", searchMaterials);

module.exports = router;