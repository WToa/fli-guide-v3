module.exports = (sequelize, DataTypes) => {
   const Material = sequelize.define(
      "Material",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         crafted_recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
      },
      {
         tableName: "materials",
         timestamps: false,
      },
   );

   return Material;
};