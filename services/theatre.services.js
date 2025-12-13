const Theatre = require('../models/theatre.model');

/**
 * 
 * @param  theatreData -> {name, description, city, pincode, address} 
 * @returns -> the newly created theatre object
 */

const createTheatre = async (theatreData) =>{
    try {
        const theatre = await Theatre.create(theatreData);
        console.log("Theatre created", theatre);
        return theatre;
    } catch(err) {
        if (err.name === 'ValidationError') {  // Client side validation error handled without using middlewares.
            let error = {};
            Object.keys(err.errors).forEach((key) => {
                error[key] = err.errors[key].message;
            })
            return {
                err: error,
                code: 422 // code for validation error
            }
        }
        throw err;
        
    }

}

/**
 * 
 * @param {*} id -> id which will identify the theatre to be deleted. 
 * @returns -> object containing info of deleted theatre.
 */

const deleteTheatreById = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if(!response) {
            return {
                err: "Theatre not found",
                code: 404
            }
        }
        return response;
    }catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * 
 * @param {*} id -> id used to identify the theatre to be fetched.
 * @returns -> the theatre that was fetched
 */

const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if(!response) {
            return {
                err: "Theatre not found",
                code: 404
            }
        }
        return response;
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

/**
 * 
 * @returns -> all the theatres present in the database.
 */

const getAllTheatres = async () => {
    try {
        const theatres = await Theatre.find();
        return theatres;

    } catch(err) {
        console.log(err);
        throw err;
    }
}

/**
 * 
 * @param {*} theatreId -> unique id of the theatre for which we want to update movies
 * @param {*} movieIds -> array of movie ids that are expected to be updated in theatre
 * @param {*} insert -> boolean that tells whether we want to insert movies or remove them
 * @returns ->updated theatre object
 */

const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    const theatre = await Theatre.findById(theatreId);
    if(!theatre) {
        return {
            err: "Theatre not found",
            code: 404
        }
    }

    // Validate that all movieIds exist in the database
    const Movie = require('../models/movie.model');
    const existingMovies = await Movie.find({ _id: { $in: movieIds } });
    const existingMovieIds = existingMovies.map(movie => movie._id.toString());
    const invalidMovieIds = movieIds.filter(id => !existingMovieIds.includes(id.toString()));

    if (invalidMovieIds.length > 0) {
        return {
            err: `Invalid movie IDs: ${invalidMovieIds.join(', ')}`,
            code: 400
        }
    }

    if(insert === true) {
        // we need to add movies
        movieIds.forEach((movieId) => {
            theatre.movies.push(movieId);
        });
        
    }else {
        // we need to remove movies
        let savedMovieIds = theatre.movies;
        movieIds.forEach((movieId) => {
            savedMovieIds = savedMovieIds.filter(smi => smi != movieId);

        });
        theatre.movies = savedMovieIds;

    }

    await theatre.save();
    return await theatre.populate('movies'); // return the theatre with movie field details populated
}


module.exports = {
    createTheatre,
    deleteTheatreById,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres,
}