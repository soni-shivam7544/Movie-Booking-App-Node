/**
 * This object tells what user_roles can be possible
 */

const USER_ROLE = {
    customer: "CUSTOMER",
    admin: "ADMIN",
    client: "CLIENT"
};

/**
 * This object tells what user_status can be possible
 */

const USER_STATUS = {
    approved: "APPROVED",
    rejected: "REJECTED",
    pending: "PENDING"
};

const STATUS = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNPROCESSED_ENTITY: 422,
    FORBIDDEN: 403
}

module.exports = {
    USER_ROLE,
    USER_STATUS,
    STATUS
}