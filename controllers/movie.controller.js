const Movie = require('../models/movie.model');
const movieServices = require('../services/movie.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');



/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ...}
 * @param {*} res 
 * @returns movie created
 * 
 */

const createMovie = async (req, res) => {
    try {
        const movie = await movieServices.createMovie(req.body);  // Create and save the movie in one step
        successResponseBody.data = movie;
        return res.status(201).json(successResponseBody);

    } catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

const deleteMovie = async (req, res) => {
    try {
        const response = await movieServices.deleteMovieById(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    } finally {
        errorResponseBody.err = {};
        successResponseBody.data = {};
    }
}

const getMovie = async (req, res) => {
    try {
        const response = await movieServices.getMovieById(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);

    } catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);

    } finally {
        errorResponseBody.err = {};
        successResponseBody.data = {};
    }
}

const updateMovie = async (req, res) => {
    try {
        const response = await movieServices.updateMovieById(req.params.id, req.body);
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    } finally {
        errorResponseBody.err = {};
        successResponseBody.data = {};
    }

}

module.exports = {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie
}