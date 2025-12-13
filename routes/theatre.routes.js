const theatreController = require('../controllers/theatre.controller');
const { validateTheatreCreateRequest, validateUpdateMovies } = require('../middlewares/theatre.middlewares');

const theatreRoutes = (app) => {
    // routes function takes express app as parameter

    // CREATE
    app.post(
        '/mba/api/v1/theatres',
        validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    // DELETE
    app.delete(
        '/mba/api/v1/theatres/:id',
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

    app.patch(
        '/mba/api/v1/theatres/:id/movies',
        validateUpdateMovies,
        theatreController.updateMovies
    );
};

module.exports = theatreRoutes;