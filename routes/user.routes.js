const userController = require('../controllers/user.controller.js');
const authMiddlewares = require('../middlewares/auth.middlewares.js');

const userRoutes = (app) => {

    // SIGNUP
    app.post(
        '/mba/api/v1/auth/signup',
        authMiddlewares.validateSignupRequest,
        userController.signup
    )
    // SIGNIN
    app.post(
        '/mba/api/v1/auth/signin',
        authMiddlewares.validateSigninRequest,
        userController.signin
    )
    // RESET
    app.patch(
        '/mba/api/v1/auth/reset',
        authMiddlewares.isAuthenticated,
        userController.resetPassword
    )
    // UPDATE USERROLE OR USERSERVICE
    app.patch(
        '/mba/api/v1/user/:id',
        userController.update
    )
}


module.exports = userRoutes;