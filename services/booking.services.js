const Booking = require('../models/booking.model');
const { STATUS } = require('../utils/constants');

const createBooking = async ( bookingData) => {
    try {
        const booking = await Booking.create(bookingData);
        return booking;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] = error.errors[key].message;
            });
            throw {err, code: STATUS.UNPROCESSED_ENTITY};
        }
        throw error;
    }
}

const updateBooking = async (id, updateData) => {
    try {
        const response = await Booking.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if(!response) {
            throw {
                err: "No booking found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;

    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] = error.errors[key].message;
            });
            throw {err, code: STATUS.UNPROCESSED_ENTITY};
        }
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking
}