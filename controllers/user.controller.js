const userService = require('../services/user.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');

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


module.exports = {
    signup
}