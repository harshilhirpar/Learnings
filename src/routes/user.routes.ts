import express from 'express'
import userControllers from '../controllers/user.controllers';
import passport from '../auth/passport';

const userRoute = express.Router()

userRoute.post('/api/v1/register', userControllers.createUserController)
userRoute.post('/api/v1/login', userControllers.loginUserController)
userRoute.get('/prot', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
        message: req.user
    })
})

export default userRoute;