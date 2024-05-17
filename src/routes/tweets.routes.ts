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
tweetsRoutes.post('/api/v1/tweet/:id/reply', passport.authenticate('jwt', {
    session: false
}), tweetControllers.replyOnTweet)
tweetsRoutes.get('/api/v1/tweet/:id', passport.authenticate('jwt', {
    session: false
}), tweetControllers.findTweetById)

export default tweetsRoutes