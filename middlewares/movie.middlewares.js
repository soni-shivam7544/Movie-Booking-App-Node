
const badRequestResponse = {
    success: false,
    message: "Bad Request. Missing required fields.",
    data: null,
    err: null
};

const validateMovieCreateRequest = (req, res, next) => {
    if(!req.body.name) {
        badRequestResponse.err = "Movie name is missing";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.description) {
        badRequestResponse.err = "Movie discription is missing";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length === 0) {
        badRequestResponse.err = "Movie casts are missing";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.trailerUrl) {
        badRequestResponse.err = "Movie trailer url is missing";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.releaseDate) {
        badRequestResponse.err = "Movie release date is missing";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.director) {
        badRequestResponse.err = "Movie director name is missing";
        return res.status(400).json(badRequestResponse);
    }

    next();
};
module.exports = {
    validateMovieCreateRequest
}
