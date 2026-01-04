const { errorResponseBody, successResponseBody } = require('../utils/responseBody');
const { STATUS } = require('../utils/constants');
const bookingService = require('../services/booking.services');

const create = async (req, res) => {
    try {
        let userId = req.user;
        const response = await bookingService.createBooking({ ...req.body, userId: userId});
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created a booking";
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch(error) {
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
    create
}