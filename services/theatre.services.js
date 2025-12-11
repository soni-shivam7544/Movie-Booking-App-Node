const Theatre = require('../models/theatre.model');

const createTheatre = async (theatreData) =>{
    const theatre = await Theatre.create(theatreData);
    console.log('Theatre created', theatre);
    return theatre;

}

module.exports = {
    createTheatre
}