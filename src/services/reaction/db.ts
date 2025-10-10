import {DataTypes, Model} from "sequelize";
import sequelize from "#src/tools/sequelize.js";
class Reaction extends Model {
  declare id: number;
  declare user: number;
  declare douj: number;
  declare type: "like" | "dislike";
  declare createdAt: Date;
  declare updatedAt: Date;
}
Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    douj: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false
    }
  },
  {sequelize}
);
export {Reaction};
