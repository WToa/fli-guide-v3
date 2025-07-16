module.exports = (sequelize, DataTypes) => {
   const RecipeMarco = sequelize.define(
      "RecipeMarco",
      {
         recipe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "recipes",
               key: "id",
            },
         },
         marco_rank_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
               model: "marco_ranks",
               key: "id",
            },
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
         },
      },
      {
         tableName: "recipe_marco",
         timestamps: false,
      }
   );

   return RecipeMarco;
};
