const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");

env.config();

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



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    console.log("Hitting /home");
    res.json({
        success: true
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}` );
});