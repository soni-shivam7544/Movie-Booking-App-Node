
const movieController = require('../controllers/movie.controller');
const movieRoutes = (app) => {
    app.post('/mba/api/v1/movie', movieController.createMovie);
}

module.exports = movieRoutes;