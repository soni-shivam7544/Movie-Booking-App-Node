const movieServices = require('../services/movie.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');

const createMovie = async (req, res) => {
    try {
        const movie = await movieServices.createMovie(req.body);  // Create and save the movie in one step
        successResponseBody.data = movie;
        successResponseBody.message = "Movie created successfully.";
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

const deleteMovie = async (req, res) => {
    try {
        const response = await movieServices.deleteMovieById(req.params.id);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    } finally {
        errorResponseBody.err = {};
        successResponseBody.data = {};
    }
}

const getMovie = async (req, res) => {
    try {
        const response = await movieServices.getMovieById(req.params.id);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);

    } catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);

    } finally {
        errorResponseBody.err = {};
        successResponseBody.data = {};
    }
}

const updateMovie = async (req, res) => {
    try {
        const response = await movieServices.updateMovieById(req.params.id, req.body);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    } finally {
        errorResponseBody.err = {};
        successResponseBody.data = {};
    }

}

const getMovies = async (req, res) => {
    try {
        const response = await movieServices.fetchMovies(req.query);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);

    }catch(error) {
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
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    getMovies
}