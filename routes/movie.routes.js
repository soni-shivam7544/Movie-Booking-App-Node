
const movieController = require('../controllers/movie.controller');
const { validateMovieCreateRequest } = require('../middlewares/movie.middlewares');


const movieRoutes = (app) => {
    app.post(
        '/mba/api/v1/movie',
        validateMovieCreateRequest,
        movieController.createMovie
    );
    app.get(
        '/mba/api/v1/movie/:id',
        movieController.getMovie
    );
    app.delete(
        '/mba/api/v1/movie/:id',
        movieController.deleteMovie
    );
    app.patch(
        '/mba/api/v1/movie/:id',
        movieController.updateMovie
    );
    app.put(
        '/mba/api/v1/movie/:id',
        validateMovieCreateRequest,
        movieController.updateMovie
    );
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    )
    

}

module.exports = movieRoutes;