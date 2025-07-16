module.exports = (sequelize, DataTypes) => {
   const LifeRank = sequelize.define(
      "LifeRank",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         profession_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         quest_rank_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         tableName: "life_ranks",
         timestamps: false,
      }
   );

   return LifeRank;
};
