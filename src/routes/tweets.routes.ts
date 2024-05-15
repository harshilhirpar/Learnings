import express from 'express'
import passport from '../auth/passport'
import tweetControllers from '../controllers/tweet.controllers'

const tweetsRoutes = express.Router()

tweetsRoutes.post('/api/v1/tweet/add', passport.authenticate('jwt', {
    session: false
}), tweetControllers.addTweetController)
tweetsRoutes.get('/api/v1/tweet/', passport.authenticate('jwt', {
    session: false
}), tweetControllers.getAllUserTweet)
tweetsRoutes.post('/api/v1/tweet/like', passport.authenticate('jwt', {
    session: false
}), tweetControllers.likeTweet)

export default tweetsRoutes