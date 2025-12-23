const movieController = require('../controllers/movie.controller');
const { validateMovieCreateRequest } = require('../middlewares/movie.middlewares');
const authMiddlewares = require('../middlewares/auth.middlewares');

const movieRoutes = (app) => {
    // routes function takes express app as parameter

    // CREATE
    app.post(
        '/mba/api/v1/movies',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdmin,
        validateMovieCreateRequest, // client request validation via middleware
        movieController.createMovie
    );

    // READ ALL
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    )

    // READ ONE
    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    );

    // DELETE
    app.delete(
        '/mba/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdmin,
        movieController.deleteMovie
    );

    // UPDATE
    app.patch(
        '/mba/api/v1/movies/:id',
        movieController.updateMovie
    );
    app.put(
        '/mba/api/v1/movies/:id',
        validateMovieCreateRequest, // client request validation via middleware
        movieController.updateMovie
    );
    
    

}

module.exports = movieRoutes;