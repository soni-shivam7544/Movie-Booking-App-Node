const user = require('../models/user.model');

const createUser = async (userData) => {
    try {
        const response = await user.create(userData);
        return response;
    } catch (error) {
        console.log(error);
        let err = {};
        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            throw { err, code:422};
        }
        
        throw error;
    }
}

module.exports = {
    createUser
}