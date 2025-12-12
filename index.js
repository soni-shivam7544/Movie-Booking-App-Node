const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");

// Load environment variables first
env.config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
movieRoutes(app);
theatreRoutes(app);

const main = () => {
    mongoose.connect(process.env.DB_URL)
    .then (() => {
        console.log("Connected to DB Successfully!");
    })
    .catch((err) => {
        console.log("DB Connection Failed!", err);
    })
}

main();


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}` );
});