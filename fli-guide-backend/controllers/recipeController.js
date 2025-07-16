const db = require("../models");
const { Op } = require("sequelize");

// 1. Get all professions
const getProfessions = async (req, res) => {
   try {
      const professions = await db.Profession.findAll();
      res.json(professions);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch professions" });
   }
};

// 2. Get categories for a selected profession
const getCategories = async (req, res) => {
   const { professionId } = req.query;
   try {
      const categories = await db.RecipeCategory.findAll({
         where: { profession_id: professionId },
      });
      res.json(categories);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch categories" });
   }
};

// 3. Get distinct ranks for a category (if applicable)
const getRanks = async (req, res) => {
   const { categoryId } = req.query;
   try {
      const ranks = await db.RecipeRank.findAll({
         include: {
            model: db.Recipe,
            where: { category_id: categoryId },
            attributes: [],
         },
         order: [["id", "ASC"]],
         group: ["RecipeRank.id"],
      });

      res.json(ranks.map((rank) => ({ id: rank.id, name: rank.name })));
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch ranks" });
   }
};

// 4. Get recipes by category and/or preset option(and optional rank & name filter), including materials
const getRecipes = async (req, res) => {
   const { categoryId, ranks, name, lifeRankIds, bisCategoryIds, marcoRankIds, materialId } =
      req.query;

   const where = {
      ...(categoryId && { category_id: categoryId }),
      ...(ranks && { rank_id: { [Op.in]: ranks.split(",") } }),
      ...(name && { name: { [Op.like]: `%${name}%` } }),
   };

   try {
      // Define the include for RecipeMaterial separately
      const recipeMaterialInclude = {
         model: db.RecipeMaterial,
         include: [db.Material],
      };

      // If filtering by material, add the 'where' clause to the include object
      if (materialId) {
         recipeMaterialInclude.where = { material_id: materialId };
         recipeMaterialInclude.required = true;
      }

      // Build the final list of includes
      const includeClauses = [
         recipeMaterialInclude, // Add the configured material include
         {
            model: db.RecipeRank,
            attributes: ["name"],
         },
      ];

      // Add includes for presets if their IDs are present
      if (lifeRankIds) {
         includeClauses.push({
            model: db.LifeRank,
            where: { id: { [Op.in]: lifeRankIds.split(",") } },
            required: true,
         });
      }
      if (bisCategoryIds) {
         includeClauses.push({
            model: db.BisCategory,
            where: { id: { [Op.in]: bisCategoryIds.split(",") } },
            required: true,
         });
      }
      if (marcoRankIds) {
         includeClauses.push({
            model: db.MarcoRank,
            through: { attributes: ["quantity"] },
            where: { id: { [Op.in]: marcoRankIds.split(",") } },
            required: true,
         });
      }

      const recipes = await db.Recipe.findAll({
         where,
         include: includeClauses,
         distinct: true,
      });

      const formatted = recipes.map((recipe) => ({
         id: recipe.id,
         name: recipe.name,
         rank: recipe.RecipeRank?.name || null,
         materials: recipe.RecipeMaterials.map((rm) => ({
            name: rm.Material?.name || "Unknown",
            quantity: rm.quantity,
         })),
         lifeRanks: recipe.LifeRanks?.map((r) => r.id) || [],
         bisCategories: recipe.BisCategories?.map((b) => b.name) || [],
         marcoRequirements:
            recipe.MarcoRanks?.map((mr) => ({
               rank: mr.rank_number,
               quantity: mr.RecipeMarco.quantity,
            })) || [],
      }));

      res.json(formatted);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch recipes with materials" });
   }
};

// 5. Get full breakdown of a recipe into crafted and base materials
const getRecipeBreakdown = async (req, res) => {
   const { recipeId } = req.params;
   const seen = new Set();

   const breakdown = {
      craftedMaterials: [],
      baseMaterials: [],
   };

   async function resolveMaterials(id, multiplier = 1) {
      const recipeMaterials = await db.RecipeMaterial.findAll({
         where: { recipe_id: id },
         include: [
            {
               model: db.Material,
               include: [
                  {
                     model: db.MaterialSources,
                     required: false,
                  },
               ],
            },
         ],
      });

      for (const rm of recipeMaterials) {
         const material = rm.Material;
         const totalQty = rm.quantity * multiplier;

         if (material.crafted_recipe_id && !seen.has(material.id)) {
            seen.add(material.id);
            breakdown.craftedMaterials.push({
               name: material.name,
               amount: totalQty,
               sources: material.MaterialSources || [],
            });
            await resolveMaterials(material.crafted_recipe_id, totalQty);
         } else {
            const existing = breakdown.baseMaterials.find(
               (m) => m.name === material.name
            );
            if (existing) {
               existing.amount += totalQty;
            } else {
               breakdown.baseMaterials.push({
                  name: material.name,
                  amount: totalQty,
                  sources: material.MaterialSources || [],
               });
            }
         }
      }
   }

   try {
      await resolveMaterials(recipeId);
      res.json(breakdown);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to resolve recipe breakdown." });
   }
};

// 6. Search all recipes by name
const searchRecipes = async (req, res) => {
   const { name } = req.query;

   if (!name || name.trim().length < 2) {
      return res.json([]);
   }

   try {
      const recipes = await db.Recipe.findAll({
         where: {
            name: { [Op.like]: `%${name}%` },
         },
         include: [
            {
               model: db.RecipeRank,
               attributes: ["name"],
            },
            {
               model: db.RecipeCategory,
               include: [db.Profession],
               attributes: ["name"],
            },
         ],
         limit: 20,
         order: [["name", "ASC"]],
      });

      const formatted = recipes.map((recipe) => ({
         id: recipe.id,
         name: recipe.name,
         rank: recipe.RecipeRank?.name,
         category: recipe.RecipeCategory?.name || "Unknown",
         profession: recipe.RecipeCategory?.Profession?.name || "Unknown",
      }));

      res.json(formatted);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to search recipes" });
   }
};

// 7. Get all life ranks (for quest preset)
const getLifeRanks = async (req, res) => {
   try {
      const ranks = await db.LifeRank.findAll({
         include: {
            model: db.QuestRank,
            attributes: ["name"],
         },
         order: [["id", "ASC"]],
      });

      const formatted = ranks.map((rank) => ({
         id: rank.id,
         questRank: rank.QuestRank?.name || "Unknown", // Corrected alias
      }));

      res.json(formatted);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch life ranks" });
   }
};

// 8. Get all BiS categories (for best-in-slot gear preset)
const getBisCategories = async (req, res) => {
   try {
      const categories = await db.BisCategory.findAll({
         order: [["name", "ASC"]],
      });
      res.json(categories);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch BiS categories" });
   }
};

// 9. Get all Marco ranks (for shop upgrade preset)
const getMarcoRanks = async (req, res) => {
   try {
      const ranks = await db.MarcoRank.findAll({
         order: [["rank_number", "ASC"]],
      });
      res.json(ranks);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch Marco ranks" });
   }
};

// 10. Get all quest ranks (used in LifeRank linkage)
const getQuestRanks = async (req, res) => {
   try {
      const ranks = await db.QuestRank.findAll({
         order: [["id", "ASC"]],
      });
      res.json(ranks);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch quest ranks" });
   }
};

const searchMaterials = async (req, res) => {
   const { name } = req.query;

   if (!name || name.trim().length < 2) {
      return res.json([]);
   }

   try {
      const materials = await db.Material.findAll({
         where: {
            name: { [Op.like]: `%${name}%` },
         },
         limit: 20,
         order: [["name", "ASC"]],
      });

      // We only need id and name for the autocomplete
      const formatted = materials.map((mat) => ({
         id: mat.id,
         name: mat.name,
      }));

      res.json(formatted);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to search materials" });
   }
};

module.exports = {
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
};
