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

const destroyTheatre = async (req, res) => {
    try {
        const response = await theatreServices.deleteTheatreById(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Theatre deleted successfully";
        return res.status(200).json(successResponseBody);
    }catch (err) {
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    } 
}

const getTheatre = async(req, res) =>{
    try {
        const response = await theatreServices.getTheatre(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the data of the theatre";
        return res.status(200).json(successResponseBody);
    } catch(err) {
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

const getTheatres = async (req, res) =>  {
    try {
        const theatres = await theatreServices.getAllTheatres();
        successResponseBody.data = theatres;
        successResponseBody.message = "Successfully fetched all theatres";
        return res.status(200).json(successResponseBody);
    } catch(err) {
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

const updateMovies = async(req, res) => {
    try {
        const response = await theatreServices.updateMoviesInTheatres(req.params.id, req.body.movieIds, req.body.insert);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated movies in theatre";
        return res.status(200).json(successResponseBody);
    } catch(err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createTheatre,
    destroyTheatre,
    getTheatre,
    getTheatres,
    updateMovies
}