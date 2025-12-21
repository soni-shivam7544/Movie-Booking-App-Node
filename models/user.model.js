const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        required: true,
        default: 'APPROVED'
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    // a trigger to encrypt the plain password before saving the user
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();

})

const User = mongoose.model('User', userSchema);

module.exports = User;