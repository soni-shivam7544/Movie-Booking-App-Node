
const mongoose = require('mongoose');
const theaterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: String,
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie'
    }

}, {
    timestamps: true
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;