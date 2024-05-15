import { Sequelize, DataTypes } from "sequelize";
import Tweets from "./tweet_model";
import DB from "../DB";

const Likes = DB.sequelize.define("Likes", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
})

export default Likes