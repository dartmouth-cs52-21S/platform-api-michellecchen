import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ silent: true });

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: { type: String },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
    // this is a reference to our model
    // the function runs in some other context so DO NOT bind it
    const user = this;

    // TODO: do stuff here

    // when done run the **next** callback with no arguments
    // call next with an error if you encounter one
    // return next();

    // Only hash the pw if it's been modified or is new.
    if (!user.isModified('password')) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

// Method that takes a 'candidatePassword' and returns a boolean.
// use bcrypt.compare
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (err, res) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, res);
        }
    });
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
