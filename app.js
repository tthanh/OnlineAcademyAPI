global._ = require('underscore');
const express = require('express');
const morgan = require('morgan');
bodyParser = require('body-parser');
//const errorHandler = require('./helpers/global_handler').default;
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/authentication', require('./routes/authentication.route'));

//Global error handler
//app.use(errorHandler);

app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});