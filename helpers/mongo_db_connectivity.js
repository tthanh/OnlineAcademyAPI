const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Course: require('../models/course.model'),
    Lesson: require('../models/course/lesson.model'),
    Feedback: require('../models/course/feedback.model'),
    Category: require('../models/category.model'),
    Purchase: require('../models/purchase.model'),
    Enrollment: require('../models/enrollment.model'),
    Otp: require('../models/otp.model')
};