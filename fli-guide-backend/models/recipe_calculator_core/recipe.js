module.exports = (sequelize, DataTypes) => {
   const Recipe = sequelize.define(
      "Recipe",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         rank_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
      },
      {
         tableName: "recipes",
         timestamps: false,
      },
   );

   return Recipe;
};