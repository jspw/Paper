const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const compression = require('compression');

const router = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(xssClean());

app.set('view engine', 'ejs');

app.set('view', 'view');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (req, res, next) => {
    res.status(202).send("Hello");
    next();
})

app.use(router);


module.exports = app;