
const mongoose = require('mongoose');
const theaterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    discription: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: String
}, {
    timestamps: true
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;