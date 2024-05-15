import { Request, Response, NextFunction } from "express"
import Tweets from "../model/tweet_model"

const addTweetController = async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body
    const user = req.user as Express.User & { id: string }
    const newTweet = await Tweets.create({
        content,
        likes: 0,
        no_of_comments: 0,
        userId: user.id
    })
    res.status(201).send({
        message: "Tweet Added",
        data: newTweet
    })
}

export default { addTweetController }