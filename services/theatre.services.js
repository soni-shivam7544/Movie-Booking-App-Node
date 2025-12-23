const Theatre = require('../models/theatre.model');
const { STATUS } = require('../utils/constants');

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
            throw {
                err: error,
                code: STATUS.UNPROCESSED_ENTITY // code for validation error
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
                code: STATUS.NOT_FOUND
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
                code: STATUS.NOT_FOUND
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

const getAllTheatres = async (data) => {
    try {
        let filter = {};
        let pagination = {};

        if(data && data.city){
            filter.city = data.city;
        }
        if(data && data.pincode) {
            filter.pincode = data.pincode;
        }
        if(data && data.name){
            filter.name = data.name;
        }
        if(data && data.movieId){
            filter.movies = { $all: data.movieId}; // $all operator matches arrays that contain all elements specified in the query array.
            //(automatically converts to array if single value is provided and also string to ObjectId)
            //Mongoose Debug: theaters.find({ movies: { '$all': [ ObjectId("690a57cf25c665cec78d7601") ] } }, {})
        }
        if(data && data.limit) {
            pagination.limit = data.limit;
        }
        if(data && data.skip) {
            // for first page we send skip as 0
            let perPage = data.limit ? data.limit : 3;
            pagination.skip = perPage * data.skip;
        }
        const theatres = await Theatre.find(filter,{},pagination);
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
    let theatre = await Theatre.findById(theatreId);
    if(!theatre) {
        return {
            err: "Theatre not found",
            code: STATUS.NOT_FOUND
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
            code: STATUS.BAD_REQUEST
        }
    }

    if(insert === true) {
        // we need to add movies
        await Theatre.updateOne(
            { _id: theatreId },
            { $addToSet: { movies: { $each: movieIds } } }
            // mongoose automatically string movie ids to ObjectIds AND addToSet avoids duplicates
        );

    }else {
        // we need to remove movies
        await Theatre.updateOne(
            { _id: theatreId },
            { $pull: { movies: { $in: movieIds } } } // pull removes all occurrences of the values in the array
        )

    }

    theatre = await Theatre.findById(theatreId);
    return await theatre.populate('movies'); // return the theatre with movie field details populated
}

/**
 * @param {*} id -> the unique identity that helps determine the theatre that needs to be updated
 * @param {*} theatreData -> the data that the theatre should be updated with
 * @returns -> the theatre with updated data or error if occure.
 */

const updateTheatre = async (id, theatreData) => {
    try {
        const theatre = await Theatre.findByIdAndUpdate(id, theatreData, { new: true, runValidators: true});
        if(!theatre) {
            return {
                err: "Theatre not found",
                code: STATUS.NOT_FOUND
            }
        }
        return theatre;
    } catch(error) {
        if(error.name === "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return {err: err, code: STATUS.UNPROCESSED_ENTITY};
        }
        throw error;
    }
}

/**
 * 
 * @param {*} theatreId -> uniquely identifies the theatre whose movies are going to be fetched
 * @returns -> theatre if it exists along with the movies playing in that theatre
 */

const getMoviesInTheatre = async (theatreId) =>{
    const theatre = await Theatre.findById(theatreId, { name: 1, address: 1, movies: 1}).populate('movies');
    if(!theatre) {
        return {
            err: "Theatre not found",
            code: STATUS.NOT_FOUND
        }
    }
    return theatre;
}

const checkMovieInTheatre = async( theatreId, movieId ) => {
    const theatre = await Theatre.findById(theatreId);
    if(!theatre){
        return {
            err:"Theatre not found!",
            code: STATUS.NOT_FOUND
        }
    }
    return theatre.movies.indexOf(movieId) !== -1;
}

module.exports = {
    createTheatre,
    deleteTheatreById,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres,
    updateTheatre,
    getMoviesInTheatre,
    checkMovieInTheatre
}