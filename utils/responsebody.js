/**
 * This object will be used as a template for building success responses.
 */
const successResponseBody = {
    success: true,
    err: {},
    data: {},
    message: 'Request processed successfully'
}

/**
 * This object will be used as a template for building error responses.
 */
const errorResponseBody = {
    success: false,
    err: {},
    data: {},
    message: 'Something went wrong'
}

module.exports = {
    successResponseBody,
    errorResponseBody
}