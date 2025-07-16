module.exports = (sequelize, DataTypes) => {
   const MarcoRank = sequelize.define(
      "MarcoRank",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         rank_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
         },
      },
      {
         tableName: "marco_ranks",
         timestamps: false,
      }
   );

   return MarcoRank;
};
