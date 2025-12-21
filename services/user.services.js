const user = require('../models/user.model');

const createUser = async (userData) => {
    try {
        const response = await user.create(userData);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser
}