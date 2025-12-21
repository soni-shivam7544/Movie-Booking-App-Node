const user = require('../models/user.model');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

const createUser = async (userData) => {
    try {
        if(!userData.userRole || userData.userRole == USER_ROLE.customer) {
            if(userData.userStatus && userData.userStatus != USER_STATUS.approved){
                throw {
                    err: "We cannot set any other user_status for customers",
                    code: 400
                }
            }
        }

        if(userData.userRole && userData.userRole != USER_ROLE.customer){
            userData.userStatus = USER_STATUS.pending;
        }



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