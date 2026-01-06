const showService = require('../services/show.services');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants'); 

const create = async (req, res) => {
    try {
        const response = await showService.createShow(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created a show";
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch(error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create
}