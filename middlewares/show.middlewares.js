const { STATUS } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responsebody")
const ObjectId = require('mongoose').Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {
    // validate theatre id
    if(!req.body.theatreId) {
        errorResponseBody.err = "No theatre provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err = "Invalid theatre id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate movie id
    if(!req.body.movieId) {
        errorResponseBody.err = "No movie provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate timing presence
    if(!req.body.timing) {
        errorResponseBody.err = "No timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate noOfSeats presence
    if(!req.body.noOfSeats) {
        errorResponseBody.err = "No seat input provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate price presence
    if(!req.body.price) {
        errorResponseBody.err = "No price provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateCreateShowRequest
}