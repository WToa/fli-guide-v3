module.exports = (sequelize, DataTypes) => {
   const RecipeBis = sequelize.define(
      "RecipeBis",
      {
         recipe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
         bis_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
      },
      {
         tableName: "recipe_bis",
         timestamps: false,
      }
   );
   return RecipeBis;
};