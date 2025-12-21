const { errorResponseBody } = require("../utils/responsebody")

const validateSignupRequest = async (req, res, next)=> {
    // Validating if required fields are not missing.

    if(!req.body.name){
        errorResponseBody.err = "User name is missing.";
        res.status(400).json(errorResponseBody);
    }
    if(!req.body.email){
        errorResponseBody.err = "Email is missing.";
        res.status(400).json(errorResponseBody);
    }
    if(!req.body.password) {
        errorResponseBody.err = "Password is missing.";
        res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateSignupRequest
}