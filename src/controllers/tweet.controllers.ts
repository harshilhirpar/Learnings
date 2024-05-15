import { Request, Response, NextFunction } from "express"
import Tweets from "../model/tweet_model"
import Likes from "../model/likes.model"
import { TweetModel } from "../types/types"
import Op from "sequelize"
import { Model } from "sequelize"

const addTweetController = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the request object
    const { content } = req.body
    // Getting the Auth User
    const user = req.user as Express.User & { id: string }
    const newTweet: Model<TweetModel> = await Tweets.create({
        content,
        likes: 0,
        no_of_comments: 0,
        UserId: user.id
    })
    res.status(201).send({
        message: "Tweet Added",
        data: newTweet
    })
}

const getAllUserTweet = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the user details
    const user = req.user as Express.User & { id: string }
    const getAllTweets: Model<TweetModel>[] | null = await Tweets.findAll({
        where: {
            UserId: user.id
        }
    })
    if (getAllTweets) {
        const tweets = await Promise.all(
            getAllTweets.map(async (tweet: any) => {
                const getTweet = await Likes.findOne({
                    where: {
                        UserId: user.id,
                        TweetId: tweet.id
                    }
                })
                if(getTweet){
                    return {
                        ...tweet.dataValues,
                        isLikedByUser: true
                    }
                }
                if(!getTweet){
                    return {
                        ...tweet.dataValues,
                        isLikedByUser: false
                    }
                }
            })
        )
        res.status(200).send({
            message: "All Tweets",
            data: tweets
        })
    }
    if (!getAllTweets) {
        res.status(200).send({
            message: "You do not have any tweets now"
        })
    }
}

const likeTweet = async (req: Request, res: Response, next: NextFunction) => {
    // Get user
    const user = req.user as Express.User & { id: string }
    // Get tweet
    const { tweetId } = req.body
    // Check if user has already liked the tweet or not
    const isLiked = await Likes.findOne({
        where: {
            UserId: user.id,
            TweetId: tweetId
        }
    })
    if (isLiked) {
        res.status(400).send({
            message: "You have already Liked this tweet"
        })
    }
    if (!isLiked) {
        const likes = await Likes.create({
            UserId: user.id,
            TweetId: tweetId
        })
        const tweet = await Tweets.findByPk(tweetId) as Model<TweetModel> & { likes: number }
        const newLikeCount: number = tweet.likes + 1
        const updatedTweet: [affectedCount: number] = await Tweets.update(
            { likes: newLikeCount },
            {
                where: {
                    id: tweetId
                }
            }
        )
        res.status(201).send({
            message: "Liked"
        })
    }
}

const countTweet = async () => {

}

export default { addTweetController, getAllUserTweet, likeTweet }