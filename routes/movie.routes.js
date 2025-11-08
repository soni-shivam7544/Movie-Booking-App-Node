
const movieController = require('../controllers/movie.controller');
const movieRoutes = (app) => {
    app.post(
        '/mba/api/v1/movie',
        movieController.createMovie
    );
    app.get(
        '/mba/api/v1/movie/:id',
        movieController.getMovie
    );
    app.delete(
        '/mba/api/v1/movie/:id',
        movieController.deleteMovie
    )

}

module.exports = movieRoutes;