import { Request, Response, NextFunction } from "express"
import Tweets from "../model/tweet_model"
import Likes from "../model/likes.model"
import { TweetModel } from "../types/types"
import Op from "sequelize"
import { Model } from "sequelize"
import { Mode } from "fs"

const addTweetController = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the request object
    const { content } = req.body
    // Getting the Auth User
    const user = req.user as Express.User & { id: string }
    const newTweet: Model<TweetModel> = await Tweets.create({
        content,
        likes: 0,
        no_of_comments: 0,
        is_reply: false,
        parentId: null,
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
                if (getTweet) {
                    return {
                        ...tweet.dataValues,
                        isLikedByUser: true
                    }
                }
                if (!getTweet) {
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

const findTweetById = async (req: Request, res: Response, next: NextFunction) => {
    // Need Tweet Id
    const tweetId = req.params.id;
    const getTweet = await Tweets.findByPk(tweetId);
    const getAllReplys = await Tweets.findAll({
        where: {
            parentId: tweetId
        }
    })
    res.status(200).send({
        message: "Found",
        data: {
            tweet: getTweet,
            replies: getAllReplys
        }
    })
}

const replyOnTweet = async (req: Request, res: Response, next: NextFunction) => {
    // Need Tweet id
    const tweetId: string = req.params.id;
    const { content } = req.body;
    const user = req.user as Express.User & { id: string };
    // Find the tweet
    const tweet = await Tweets.findByPk(tweetId) as Model<TweetModel> & { no_of_comments: number } | null;
    if (tweet) {
        const newTweet: Model<TweetModel> = await Tweets.create({
            content,
            likes: 0,
            no_of_comments: 0,
            is_reply: true,
            parentId: tweetId,
            UserId: user.id
        })
        const updateNoOfComments: [affectedCount: number] = await Tweets.update({
            no_of_comments: tweet.no_of_comments + 1
        }, {
            where: {
                id: tweetId
            }
        })
        res.status(201).send({
            message: "Reply Added",
            data: newTweet
        })
    }
    if (!tweet) {
        res.status(404).send({
            message: "Tweet Not Found"
        });
    }
}

export default {
    addTweetController, getAllUserTweet, likeTweet, replyOnTweet, findTweetById
}