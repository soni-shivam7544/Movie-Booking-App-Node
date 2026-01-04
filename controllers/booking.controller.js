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

const update = async (req, res) => {
    try {
        const response = await bookingService.updateBooking(req.params.id, req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the booking";
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
    update
}