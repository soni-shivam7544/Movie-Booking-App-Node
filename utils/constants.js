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

module.exports = {
    USER_ROLE,
    USER_STATUS
}