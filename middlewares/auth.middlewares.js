const { errorResponseBody } = require("../utils/responsebody")
const jwt = require("jsonwebtoken");
const userService = require('../services/user.services');
const { USER_ROLE } = require('../utils/constants');

/**
 * Validator of user signup
 * @param {*} req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next ->Pointer to the next middleware
 * @returns -> errorResponseBody for the corresponding client-side error
 */

const validateSignupRequest = (req, res, next)=> {
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

const validateSigninRequest = (req,res,next)=>{
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

const validateResetPasswordRequest = (req, res, next) => {
    // validate old password presence
    if(!req.body.oldPassword){
        errorResponseBody.err = "Missing the old password in the request";
        return res.status(400).json(errorResponseBody);

    }
    // validate new password presence
    if(!req.body.newPassword){
        errorResponseBody.err = "Missing the new password in the request";
        return res.status(400).json(errorResponseBody);
    }

    // we can proceed
    next();
}

const validateUpdateUserRequest = (req, res, next) => {
    // Validate presence of atleast one of the two i.e. userRole or userStatus
    if(!(req.body.userRole || req.body.userStatus)) {
        errorResponseBody.err = "Malformed request, please send atleast one parameter userRole or userStatus";
        return res.status(400).json(errorResponseBody);
    }
    next();
} 

const isAdmin = async(req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        errorResponseBody.err = "User is not an admin, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    next();
}

const isClient = async(req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        errorResponseBody.err = "User is not a client, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    next();
}

const isAdminOrClient = async(req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
        errorResponseBody.err = "User is neither a client nor an admin, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    next();
}


module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    validateUpdateUserRequest,
    isClient,
    isAdmin,
    isAdminOrClient
}