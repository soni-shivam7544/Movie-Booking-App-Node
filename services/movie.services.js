const Movie = require('../models/movie.model');

/**
 * 
 * @param movieData -> {name, description, ...}
 * @returns -> the newly created movie object
 */

const createMovie = async (movieData) => {
    try {
        const movie = await Movie.create(movieData);
        console.log("Movie created", movie);
        return movie;
    } catch(error) {
        let err = {}
        if(error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return {err, code: 422};  // code 422 for logical validation error
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
    const movie = await Movie.findById(id);
    console.log("Movie fetched", movie);
    if(!movie){
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }
    }
    return movie;
}

/**
 * 
 * @param  id -> id which will be used to identify the movie to be deleted.
 *  
 * @returns -> object containing info of deleted movie.
 */

const deleteMovieById = async (id) => {
    const response = await Movie.deleteOne({
        _id: id
    })
    if(response.deletedCount === 0){
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }

    }
    return response;
}

/**
 * 
 * @param id -> used to identify the movie to be updated
 * @param updateData -> data to update the movie with
 * @returns -> updated movie object
 */

const updateMovieById = async (id, updateData) => {
    const movie = await Movie.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    console.log("Movie updated", movie);
    return movie;
}

/**
 * 
 * @param {*} filter -> filter object to filter movies
 * @returns -> the array of movies that match the filter criteria
 */

const fetchMovies= async (filter) => {
    let query = {};
    if(filter.name){
        query.name = filter.name;
    }
    const movies = await Movie.find(query);
    if(movies.length === 0){
        return {
            err: "No movie found for the corresponding filter provided",
            code: 404
        }
    }
    return movies;
}

module.exports = {
    getMovieById,
    deleteMovieById,
    createMovie,
    updateMovieById,
    fetchMovies
}