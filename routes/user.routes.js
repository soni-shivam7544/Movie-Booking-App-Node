const userController = require('../controllers/user.controller.js');

const userRoutes = (app) => {

    // CREATE
    app.post(
        '/mba/api/v1/auth/signup',
        userController.signup
    )
}


module.exports = userRoutes;