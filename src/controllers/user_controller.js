import jwt from 'jwt-simple';
import dotenv from 'dotenv';

import User from '../models/user_model';

dotenv.config({ silent: true });

// Do verification with passport middleware
// All we have to do here is return a new token
export const signin = (req, res, next) => {
    res.send({
        token: tokenForUser(req.user),
    });
};

// Create a new User object & save it, but first verify that the user doesn't already exist in the system
// AKA check their email address.
export const signup = (req, res, next) => {
    const { email } = req.body.email;
    const { password } = req.body.password;

    // Authenticate that these both exist
    // Mostly arbitrary status codes
    if (!email || !password) return res.status(422).send('Please check that you have filled out an email & password.');

    // Authenticate that the email is not a duplicate (that a user does not already exist)
    User.find({ email })
        .then((result) => {
            if (result.length !== 0) {
                return res.status(500).send('This email is already taken. Please sign in with your existing email or use another one.');
            } else {
                const user = new User();
                user.email = email;
                user.password = password;
                user.save()
                    .then(() => {
                        res.send({ token: tokenForUser(user) });
                    })
                    .catch((error) => {
                        res.status(500).json({ error });
                });
            }
        });
};

// encodes a new token for a user object
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
