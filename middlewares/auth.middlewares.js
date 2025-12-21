const { errorResponseBody } = require("../utils/responsebody")

/**
 * Validator of user signup
 * @param {*} req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next ->Pointer to the next middleware
 * @returns -> errorResponseBody for the corresponding client-side error
 */

const validateSignupRequest = async (req, res, next)=> {
    // Validating if required fields are not missing.

    if(!req.body.name){
        errorResponseBody.err = "User name is missing.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.email){
        errorResponseBody.err = "Email is missing.";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.password) {
        errorResponseBody.err = "Password is missing.";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

/**
 * validator of user signin
 * @param {*} req -> http request object
 * @param {*} res -> http response object
 * @param {*} next -> next middleware
 */

const validateSigninRequest = async(req,res,next)=>{
    // validate user email presence
    if(!req.body.email){
        errorResponseBody.err = "No email provided for sign in";
        return res.status(400).json(errorResponseBody);
    }

    // validate user password presence
    if(!req.body.password){
        errorResponseBody.err = "No passward provided for authentication";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest
}