require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const routes = require("./routes/routes");
const app = express();
const port = process.env.API_PORT;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("", routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})