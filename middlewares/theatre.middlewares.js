const { errorResponseBody } = require('../utils/responsebody');

const validateTheatreCreateRequest = (req, res, next) => {
    if(!req.body.name) {
        errorResponseBody.err = "Theatre name is missing";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.city) {
        errorResponseBody.err = "Theatre city is missing";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.pincode) {
        errorResponseBody.err = "Theatre pincode is missing";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateTheatreCreateRequest
}