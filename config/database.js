require('dotenv').config();
const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;

exports.connect = () => {
    mongoose.connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected with database:  ", mongo_uri);
    }).catch((error) => {
        console.log("Database connection failed. existing now...");
        console.error(error);
    })
}