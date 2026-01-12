const paymentService = require('../services/payment.services');
const { BOOKING_STATUS, STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');
const { sendMail } = require('../services/email.service');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model');

const create = async (req, res) => {
    try {
        const response = await paymentService.createPayment(req.body);

        if(response.status == BOOKING_STATUS.expired) {
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed, therefore the booking is expired.';
            errorResponseBody.data = response;
            return res.status( STATUS.GONE).json(errorResponseBody);
        }

        if(response.status == BOOKING_STATUS.cancelled) {
            errorResponseBody.err = 'The payment failed due to some reason, the booking could not be made, please try again.';
            errorResponseBody.data = response;
            return res.status( STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully.';
        
        const user = await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        
        sendMail('Your booking is Successful', response.userId,`Your booking for movie ${ movie.name } in ${ theatre.name } theatre for ${ response.noOfSeats } seats on ${ response.timing } is successful. Your booking id is ${ response._id }. Thankyou for using our platform for your bookings and hope you all enjoy the movie.`);
        
        res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getPaymentsDetailsById = async (req, res) => {
    try {
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Payment details fetched successfully.';
        return res.status(STATUS.OK).json(successResponseBody);
        
    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllPayments = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = 'All payments fetched successfully.';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getPaymentsDetailsById,
    getAllPayments
}