const successResponseBody = {
    success: true,
    err: {},
    data: {},
    message: 'Request processed successfully'
}
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