module.exports = (sequelize, DataTypes) => {
   const RecipeRank = sequelize.define(
      "RecipeRank",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         tableName: "recipe_ranks",
         timestamps: false,
      },
   );

   return RecipeRank;
};
