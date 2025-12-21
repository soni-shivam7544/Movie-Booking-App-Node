const jwt = require('jsonwebtoken');
const env = require('dotenv');
const userService = require('../services/user.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');

env.config();
const signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        successResponseBody.data = user;
        successResponseBody.message = "User registered successfully.";
        return res.status(201).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const signin = async(req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword) throw { err: 'Invalid password for the given email', code: 401};
        
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.AUTH_KEY,
            {expiresIn: '1h'}
        );
        console.log(jwt.verify(token,process.env.AUTH_KEY));

        successResponseBody.message = "Successfully logged in";
        successResponseBody.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        }
        return res.status(200).json(successResponseBody);

    } catch(error) {
        console.log(error);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    signup,
    signin
}