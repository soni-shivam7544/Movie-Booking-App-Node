const theatreController = require('../controllers/theatre.controller');
const { validateTheatreCreateRequest } = require('../middlewares/theatre.middlewares');

const theatreRoutes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        validateTheatreCreateRequest,
        theatreController.createTheatre
    );
};

module.exports = theatreRoutes;