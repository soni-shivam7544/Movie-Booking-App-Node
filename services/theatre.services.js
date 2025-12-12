const Theatre = require('../models/theatre.model');

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

module.exports = {
    createTheatre,
    getTheatre
}