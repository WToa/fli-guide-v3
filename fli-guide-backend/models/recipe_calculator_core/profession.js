module.exports = (sequelize, DataTypes) => {
   const Profession = sequelize.define(
      "Profession",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
         },
      },
      {
         tableName: "professions",
         timestamps: false,
      },
   );

   return Profession;
};
