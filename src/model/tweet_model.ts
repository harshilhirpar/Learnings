import { Sequelize, DataTypes } from "sequelize";
import DB from "../DB";

const Tweets = DB.sequelize.define("Tweets", {
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    noOfComments: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isReply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export default Tweets