const { errorResponseBody } = require('../utils/responsebody');

/**
 * 
 * @param {*} req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */

const validateTheatreCreateRequest = (req, res, next) => {
    // validate the presence of name
    if(!req.body.name) {
        errorResponseBody.err = "Theatre name is missing";
        return res.status(400).json(errorResponseBody);
    }
    // validate the presence of city
    if(!req.body.city) {
        errorResponseBody.err = "Theatre city is missing";
        return res.status(400).json(errorResponseBody);
    }
    // validate the presence of address
    if(!req.body.pincode) {
        errorResponseBody.err = "Theatre pincode is missing";
        return res.status(400).json(errorResponseBody);
    }

    next(); // everything is fine, proceed to the next middleware
}

const validateUpdateMovies = async (req, res, next) => {
    // validate the presence of insert parameter
    if(req.body.insert === undefined){
        errorResponseBody.message = "The insert parameter is missing.";
        return res.status(400).json(errorResponseBody);
    }
    // validate the presence of movieIds parameter
    if(!req.body.movieIds) {    
        errorResponseBody.message = "No movies present in the request to be updated in theatre";
        return res.status(400).json(errorResponseBody);
    }
    // validate whether movieIds is an array
    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.message = "Expected array of movies but found something else.";
        return res.status(400).json(errorResponseBody);
    }
    // validate whether movieIds array is not empty
    if(req.body.movieIds.length === 0) {
        errorResponseBody.message = "MovieIds array is empty. Please provide movie ids to be updated in theatre.";
        return res.status(400).json(errorResponseBody);
    }

    next(); // everything is fine, proceed to the next middleware
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovies
}