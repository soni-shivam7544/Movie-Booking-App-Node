const theatreController = require('../controllers/theatre.controller');
const { validateTheatreCreateRequest, validateUpdateMovies } = require('../middlewares/theatre.middlewares');
const authMiddlewares = require('../middlewares/auth.middlewares');

const theatreRoutes = (app) => {
    // routes function takes express app as parameter

    // CREATE
    app.post(
        '/mba/api/v1/theatres',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    // DELETE
    app.delete(
        '/mba/api/v1/theatres/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        theatreController.destroyTheatre
    );

    // READ ONE
    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    )

    // READ ALL
    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    ) 
    
    // READ MOVIES IN THEATRE
    app.get(
        '/mba/api/v1/theatres/:id/movies',
        theatreController.getMovies
    )

    // CHECK MOVIE IN THEATRE
    app.get(
        '/mba/api/v1/theatres/:theatreId/movies/:movieId',
        theatreController.checkMovie
    )
  
    // UPDATE
    app.put(
        '/mba/api/v1/theatre/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        validateTheatreCreateRequest,
        theatreController.updateTheatre
    )

    app.patch(
        '/mba/api/v1/theatre/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        theatreController.updateTheatre
    )
  
    app.patch(
        '/mba/api/v1/theatres/:id/movies',
        validateUpdateMovies,
        theatreController.updateMovies
    );
};

module.exports = theatreRoutes;