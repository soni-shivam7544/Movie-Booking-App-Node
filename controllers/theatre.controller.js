const theatreServices = require('../services/theatre.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');

const createTheatre = async (req, res) => {
    try {
        const theatre = await theatreServices.createTheatre(req.body);
        if(theatre.err) {
            errorResponseBody.err = theatre.err;
            errorResponseBody.message = "Validation Failed";
            return res.status(theatre.code).json(errorResponseBody);
        }
        successResponseBody.data = theatre;
        return res.status(201).json(successResponseBody);

    } catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}


module.exports = {
    createTheatre
}