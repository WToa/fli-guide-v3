module.exports = (sequelize, DataTypes) => {
   const QuestRank = sequelize.define("quest_rank", {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   }, {
      tableName: "quest_ranks",
      timestamps: false,
   });

   return QuestRank;
};
