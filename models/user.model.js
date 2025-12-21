const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    userRole: {
        type: String,
        required: true,
        enum: {
            values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
            message: "Invalid user_role mentioned."
        },
        default: USER_ROLE.customer
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved, USER_STATUS.rejected, USER_STATUS.pending],
            message: "Invalid user_status mentioned."
        },
        default: USER_STATUS.approved
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    // a trigger to encrypt the plain password before saving the user
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();

});

/**
 * 
 * @param  plainPassword ->input password given by user in sign in request
 * @returns ->boolean denoting whether passwords are same or not ?
 */

userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;