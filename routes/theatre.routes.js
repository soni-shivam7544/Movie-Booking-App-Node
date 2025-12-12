const theatreController = require('../controllers/theatre.controller');
const { validateTheatreCreateRequest } = require('../middlewares/theatre.middlewares');

const theatreRoutes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        validateTheatreCreateRequest,
        theatreController.createTheatre
    );
    // app.delete(
    //     '/mba/api/v1/theatres/:id',
    //     theatreController.destroyTheatre
    // )
    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    )
    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    )
};

module.exports = theatreRoutes;