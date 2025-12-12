const { errorResponseBody } = require('../utils/responsebody');

/**
 * 
 * @param {*} req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */

const validateTheatreCreateRequest = (req, res, next) => {
    // validate the presence of name
    if(!req.body.name) {
        errorResponseBody.err = "Theatre name is missing";
        return res.status(400).json(errorResponseBody);
    }
    // validate the presence of city
    if(!req.body.city) {
        errorResponseBody.err = "Theatre city is missing";
        return res.status(400).json(errorResponseBody);
    }
    // validate the presence of address
    if(!req.body.pincode) {
        errorResponseBody.err = "Theatre pincode is missing";
        return res.status(400).json(errorResponseBody);
    }

    next(); // everything is fine, proceed to the next middleware
}

module.exports = {
    validateTheatreCreateRequest
}