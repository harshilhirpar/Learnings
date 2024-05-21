import express from 'express'
import userControllers from '../controllers/user.controllers';
import passport from '../auth/passport';
import upload from '../middleware/multer';

const userRoute = express.Router()

userRoute.post('/api/v1/register', userControllers.createUserController)
userRoute.post('/api/v1/login', userControllers.loginUserController)
userRoute.post('/api/v1/subscription/subscribe', passport.authenticate('jwt', { session: false}), userControllers.subscribeUserToPlan)
userRoute.post('/api/v1/profileImg', passport.authenticate('jwt', {
    session: false
}), upload.single('file'), userControllers.addProfilePicture)

export default userRoute;