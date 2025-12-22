const { errorResponseBody } = require("../utils/responsebody")
const jwt = require("jsonwebtoken");
const userService = require('../services/user.services');

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

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token) {
            errorResponseBody.err = "No token provided";
            return res.status(403).json(errorResponseBody);
        }
        const response = jwt.verify(token, process.env.AUTH_KEY);
        if(!response) {
            errorResponseBody.err = "Token not verified.";
            return res.status(401).json(errorResponseBody);
        }
        const user = await userService.getUserById(response.id);
        req.user = user.id;

        next();
    } catch(error) {
        if(error.name == "JsonWebTokenError"){
            errorResponseBody.err = error.message;
            return res.status(401).json(errorResponseBody);
        }
        if(error.code == 404) {
            errorResponseBody.err = "User doesn't exist";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated
}