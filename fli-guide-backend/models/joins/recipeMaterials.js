module.exports = (sequelize, DataTypes) => {
   const RecipeMaterials = sequelize.define(
      "RecipeMaterials",
      {
         recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         material_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         tableName: "recipe_materials",
         timestamps: false,
      },
   );

   return RecipeMaterials;
};
