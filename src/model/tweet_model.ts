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
    no_of_comments: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_reply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    parentId: {
        type: DataTypes.UUID,
        allowNull: true
    }
})

export default Tweets