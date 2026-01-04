const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;
const theatreService = require('../services/theatre.services');

const validateBookingCreateRequest = async (req, res, next) => {
    // validate the theatre id presence
    if(!req.body.theatreId) {
        errorResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate correct theatre id format
    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err = "Invalid theatre id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // check if theatre exists in database
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre ){
        errorResponseBody.err = "No theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    // validate movie id presence
    if(!req.body.movieId) {
        errorResponseBody.err = "No movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate correct movie id format
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // check if movie is present in the theatre
    if(!theatre.movies.includes(req.body.movieId)){
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    //validate presence of timing
    if(!req.body.timing) {
        errorResponseBody.err = "No show timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate no of seats presence
    if(!req.body.noOfSeats) {
        errorResponseBody.err = "Number of seats not provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateBookingCreateRequest
}