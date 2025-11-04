const Movie = require('../models/movie.model');


/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ...}
 * @param {*} res 
 * @returns movie created
 * 
 */

const createMovie = async (req, res) => {
    try {
        console.log(req.body);
        const movie = await Movie.create(req.body);  // Create and save the movie in one step
        
        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: 'Successfully created a new movie',

        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: true,
            error: err,
            data: {},
            message: 'Something went wrong'
        });
    }
}

module.exports = {
    createMovie
}