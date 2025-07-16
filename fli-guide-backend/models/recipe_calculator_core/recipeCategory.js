module.exports = (sequelize, DataTypes) => {
   const RecipeCategory = sequelize.define(
      "RecipeCategory",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         name: {
            type: DataTypes.STRING(100),
            allowNull: false,
         },
         profession_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         has_ranks: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
         },
      },
      {
         tableName: "recipe_categories",
         timestamps: false,
      },
   );

   return RecipeCategory;
};
