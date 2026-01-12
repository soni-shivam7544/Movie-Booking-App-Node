const axios = require('axios');
const User = require('../models/user.model');

const sendMail = async (subject, userId, content) => {
    const user = await User.findById(userId);
    axios.post(process.env.NOTI_SERVICE + "/notiservice/api/v1/notifications", {
        subject: subject,
        content: content,
        recepientEmails: [user.email]
    });
}

module.exports = {
    sendMail
}