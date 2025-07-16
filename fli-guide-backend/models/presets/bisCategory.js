module.exports = (sequelize, DataTypes) => {
   const BisCategory = sequelize.define(
      "BisCategory",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
         },
      },
      {
         tableName: "bis_categories",
         timestamps: false,
      }
   );

   return BisCategory;
};
