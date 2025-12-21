const userService = require('../services/user.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody.js');

const signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        successResponseBody.data = user;
        successResponseBody.message = "User registered successfully.";
        res.status(201).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        res.status(500).json(errorResponseBody);
    }
}


module.exports = {
    signup
}