global._ = require('underscore');
const express = require('express');
const morgan = require('morgan');
bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

const auth = require('./middlewares/auth.mdw');

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/authentication', require('./routes/authentication.route'));
app.use('/api/course', require('./routes/course.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/purchase', require('./routes/purchase.route'));

app.listen(process.env.PORT || 3000,'0.0.0.0', () => {
    console.log('Authentication service started on port 3000');
});