import User from "../model/user.model";
import Tweets from "../model/tweet_model";
import Likes from "../model/likes.model";
import DB from ".";
import { Sequelize } from "sequelize";

const db: any = {}

db.Sequelize = Sequelize
db.sequelize = DB.sequelize

// DB Init
db.users = User
db.tweets = Tweets
db.likes = Likes
// DB Associations
// User Has Many Tweets and Likes
db.users.hasMany(db.tweets)
db.users.hasMany(db.likes)
// Tweets Has Many Likes
db.tweets.hasMany(db.likes)
// Tweets belongs to users
db.tweets.belongsTo(db.users)
db.likes.belongsTo(db.users)
// Likes belongs to tweets
db.likes.belongsTo(db.tweets)

db.tweets.hasMany(db.tweets)
db.tweets.belongsTo(db.tweets)

export default db;
