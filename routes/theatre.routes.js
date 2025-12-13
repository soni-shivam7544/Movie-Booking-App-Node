const theatreController = require('../controllers/theatre.controller');
const { validateTheatreCreateRequest } = require('../middlewares/theatre.middlewares');

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

    // UPDATE
    app.put(
        '/mba/api/v1/theatre/:id',
        validateTheatreCreateRequest,
        theatreController.updateTheatre
    )

    app.patch(
        '/mba/api/v1/theatre/:id',
        theatreController.updateTheatre
    )
};

module.exports = theatreRoutes;