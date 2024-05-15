import User from "../model/user.model";
import Plans from "../model/plans.model";
import Tweets from "../model/tweet_model";
import DB from ".";
import { Sequelize } from "sequelize";

const force = true

const db: any = {}

db.Sequelize = Sequelize
db.sequelize = DB.sequelize

// DB Init
db.users = User
db.tweets = Tweets
// DB Association
db.users.hasMany(db.tweets)
db.tweets.belongsTo(db.users)


// const createTables = async () => {
//     await User.sync({ force, logging: false })
//     console.log("Table User Created")
//     await Plans.sync({ force, logging: false })
//     console.log("Table Plans Created")
//     await Tweets.sync({ force, logging: false })
//     console.log("Table Tweets Created")
// }

// const defineRelations = () => {
//     //Defining the Relations
//     User.hasMany(Tweets, { sourceKey: 'id'})
//     Tweets.belongsTo(User, { targetKey: 'id'})
// }

// export default {createTables, defineRelations};

export default db;
