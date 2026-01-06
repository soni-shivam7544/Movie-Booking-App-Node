const Show = require('../models/show.model');
const { STATUS } = require('../utils/constants');
const Theatre = require('../models/theatre.model');

/**
 * 
 * @param {*} data -> object containing details of the show to be created
 * @returns -> object with the new show details
 */

const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre) {
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        if(!theatre.movies.indexOf(data.movieId) > -1) {
            throw {
                err: "Given movie is not available in the requested theatre",
                code: STATUS.UNPROCESSED_ENTITY
            }
        }

        const newShow = await Show.create(data);
        return newShow;
    } catch (error) {
        if(error.name == "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {
                err: err,
                code: STATUS.UNPROCESSED_ENTITY
            }
        }
        throw error;
    }
}

const getShows = async (data) => {
    try {
        let filter = {};
        if(data.theatreId) {
            filter.theatreId = data.theatreId;
        }
        if(data.movieId) {
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if(!response) {
            throw {
                err: "No shows found",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createShow,
    getShows
}