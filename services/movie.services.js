const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');


/**
 * 
 * @param movieData -> {name, description, ...}
 * @returns -> the newly created movie object
 */

const createMovie = async (movieData) => {
    try {
        const movie = await Movie.create(movieData);
        return movie;
    } catch(error) {
        let err = {}
        if(error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err, code: STATUS.UNPROCESSED_ENTITY};  // code 422 for logical validation error
        }
        throw err;
        
    }
}

/**
 * 
 * @param  id -> id used to identify the movie to be fetched. 
 * @returns -> the movie that was fetched
 */

const getMovieById = async (id) =>{
    try {
        const movie = await Movie.findById(id);
        if(!movie){
            throw {
                err: "No movie found for the corresponding id provided",
                code: STATUS.NOT_FOUND
            }
        }
        return movie;
    } catch(error){
        console.log(error);
        throw error;
    }
}

/**
 * 
 * @param  id -> id which will be used to identify the movie to be deleted.
 *  
 * @returns -> object containing info of deleted movie.
 */

const deleteMovieById = async (id) => {
    try {
        const response = await Movie.deleteOne({
            _id: id
        })
        if(response.deletedCount === 0){
            throw {
                err: "No movie found for the corresponding id provided",
                code: STATUS.NOT_FOUND
            }

        }
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param id -> used to identify the movie to be updated
 * @param updateData -> data to update the movie with
 * @returns -> updated movie object
 */

const updateMovieById = async (id, updateData) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return movie;
    } catch(error) {
        if(error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err, code: STATUS.UNPROCESSED_ENTITY};  // code 422 for logical validation error
        }
        throw error;
    }
}

/**
 * 
 * @param {*} filter -> filter object to filter movies
 * @returns -> the array of movies that match the filter criteria
 */

const fetchMovies= async (filter) => {
    try {
        let query = {};
        if(filter.name){
            query.name = filter.name;
        }
        const movies = await Movie.find(query);
        if(movies.length === 0){
            throw {
                err: "No movie found for the corresponding filter provided",
                code: STATUS.NOT_FOUND
            }
        }
        return movies;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getMovieById,
    deleteMovieById,
    createMovie,
    updateMovieById,
    fetchMovies
}