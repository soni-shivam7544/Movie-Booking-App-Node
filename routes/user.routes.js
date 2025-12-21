const userController = require('../controllers/user.controller.js');
const authMiddlewares = require('../middlewares/auth.middlewares.js');

const userRoutes = (app) => {

    // SIGNUP
    app.post(
        '/mba/api/v1/auth/signup',
        authMiddlewares.validateSignupRequest,
        userController.signup
    )
}


module.exports = userRoutes;