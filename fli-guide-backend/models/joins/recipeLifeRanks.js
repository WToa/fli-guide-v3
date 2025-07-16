module.exports = (sequelize, DataTypes) => {
   const RecipeLifeRanks = sequelize.define(
      "RecipeLifeRanks",
      {
         recipe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
         life_rank_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
      },
      {
         tableName: "recipe_life_ranks",
         timestamps: false,
      }
   );
   return RecipeLifeRanks;
};