
const badRequestResponse = {
    success: false,
    message: "Bad Request. Missing required fields.",
    data: null,
    err: null
};

/**
 * 
 * @param {*} req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */

const validateMovieCreateRequest = (req, res, next) => {
    // validate the presene of name
    if(!req.body.name) {
        badRequestResponse.err = "Movie name is missing";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of description
    if(!req.body.description) {
        badRequestResponse.err = "Movie discription is missing";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of casts
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length === 0) {
        badRequestResponse.err = "Movie casts are missing";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of trailerUrl
    if(!req.body.trailerUrl) {
        badRequestResponse.err = "Movie trailer url is missing";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of releaseDate
    if(!req.body.releaseDate) {
        badRequestResponse.err = "Movie release date is missing";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of director
    if(!req.body.director) {
        badRequestResponse.err = "Movie director name is missing";
        return res.status(400).json(badRequestResponse);
    }

    next(); // everything is fine, proceed to the next middleware
};
module.exports = {
    validateMovieCreateRequest
}
