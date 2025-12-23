const theatreServices = require('../services/theatre.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');
const { STATUS } = require("../utils/constants");

const createTheatre = async (req, res) => {
    try {
        const theatre = await theatreServices.createTheatre(req.body);
        
        successResponseBody.data = theatre;
        successResponseBody.message = "Theatre created successfully.";
        return res.status(STATUS.CREATED).json(successResponseBody);

    } catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
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
        return res.status(STATUS.OK).json(successResponseBody);
    }catch (err) {
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
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
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(err) {
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatres = async (req, res) =>  {
    try {
        const theatres = await theatreServices.getAllTheatres( req.query );
        successResponseBody.data = theatres;
        successResponseBody.message = "Successfully fetched all theatres";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(err) {
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
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
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateTheatre = async (req, res) => {
    try {
        const response = await theatreServices.updateTheatre(req.params.id, req.body);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Theatre updated successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await theatreServices.getMoviesInTheatre(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const checkMovie = async (req, res) => {
    try {
        const isMoviePresent = await theatreServices.checkMovieInTheatre(req.params.theatreId, req.params.movieId);
        if(isMoviePresent.err) {
            errorResponseBody.err = isMoviePresent.err;
            return res.status(isMoviePresent.code).json(errorResponseBody);
        }
        successResponseBody.data = isMoviePresent;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    createTheatre,
    destroyTheatre,
    getTheatre,
    getTheatres,
    updateMovies,
    updateTheatre,
    getMovies,
    checkMovie
}