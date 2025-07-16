module.exports = (sequelize, DataTypes) => {
   const MaterialSources = sequelize.define(
      "MaterialSources",
      {
         material_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         collection_type: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         profession_name: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         map_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         target_name: {
            type: DataTypes.STRING,
            allowNull: true,
         },
      },
      {
         tableName: "material_sources",
         timestamps: false,
      },
   );

   return MaterialSources;
};