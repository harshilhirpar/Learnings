import passport from 'passport'
import passportJWT from 'passport-jwt'
import User from '../model/user.model';
import dotenv from 'dotenv'
dotenv.config()

const jwt_secret = process.env.JWT || 'Harshil'

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_secret, // Change this to your own secret key
}, (jwtPayload, done) => {
    // Check if the user exists in the database
    User.findOne({ where: { id: jwtPayload.id } })
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
}));

export default passport;