import { Request, Response, NextFunction } from "express"
import Tweets from "../model/tweet_model"
import Likes from "../model/likes.model"
import { LikeModel, TweetModel } from "../types/types"
import { Model, Op } from "sequelize"
import { Mode } from "fs"

const addTweetController = async (req: Request, res: Response, next: NextFunction) => {
    // Getting the request object
    const { content } = req.body
    // Getting the Auth User
    const user = req.user as Express.User & { id: string }
    const newTweet: Model<TweetModel> = await Tweets.create({
        content,
        likes: 0,
        noOfComments: 0,
        isReply: false,
        TweetId: null,
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
    const tweetId: string = req.params.id;
    const getTweet: Model<TweetModel> | null = await Tweets.findByPk(tweetId);
    const getAllReplys: Model<TweetModel>[] = await Tweets.findAll({
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

const dislikeTweet = async (req: Request, res: Response, next: NextFunction) => {
    // Get the user
    const user = req.user as Express.User & { id: string}
    // Get the tweet id
    const {tweetId} = req.body
    // Find the tweet
    const tweet = await Tweets.findByPk(tweetId) as Model<TweetModel> & { likes: number }
    if(!tweet){
        res.status(404).send({
            message: "Something Went Wrong"
        })
    }
    if(tweet){
        const isLiked: Model<LikeModel> | null = await Likes.findOne({
            where: {
                [Op.and]: [{UserId: user.id}, {TweetId: tweetId}]
            }
        })
        if(!isLiked){
            res.status(404).send({
                message: "You have already disliked"
            })
        }
        if(isLiked){

        
        const likeCount: number = tweet.likes
        const updatedLikeCount: number = likeCount - 1
        const updateTweet: [affectedCount: number] = await Tweets.update({
            likes: updatedLikeCount
        }, {
            where: {
                id: tweetId
            }
        })
        const deleteDetailFromLike: number = await Likes.destroy({
            where: {
                [Op.and]: [{UserId: user.id}, {TweetId: tweetId}]
            }
        })
        res.status(200).send({
            message: "Disliked"
        })
    }
    }
}

export default {
    addTweetController, getAllUserTweet, likeTweet, replyOnTweet, findTweetById, dislikeTweet
}