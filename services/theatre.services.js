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

const getAllTheatres = async (data) => {
    try {
        let filter = {};
        if(data && data.city){
            filter.city = data.city;
        }
        if(data && data.pincode) {
            filter.pincode = data.pincode;
        }
        if(data && data.name){
            filter.name = data.name;
        }
        const theatres = await Theatre.find(filter);
        return theatres;

    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createTheatre,
    deleteTheatreById,
    getTheatre,
    getAllTheatres
}