const theatreController = require('../controllers/theatre.controller');

const theatreRoutes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        theatreController.createTheatre
    );
};

module.exports = theatreRoutes;