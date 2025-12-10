const Movie = require('../models/movie.model');

const createMovie = async (movieData) => {
    const movie = await Movie.create(movieData);
    console.log("Movie created", movie);
    return movie;
}

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

const updateMovieById = async (id, updateData) => {
    const movie = await Movie.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    console.log("Movie updated", movie);
    return movie;
}

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