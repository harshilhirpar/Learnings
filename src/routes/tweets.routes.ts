import express from 'express'
import passport from '../auth/passport'
import tweetControllers from '../controllers/tweet.controllers'

const tweetsRoutes = express.Router()

tweetsRoutes.post('/api/v1/tweet/add', passport.authenticate('jwt', {
    session: false
}), tweetControllers.addTweetController)

export default tweetsRoutes