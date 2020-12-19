const db = require('../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Course = db.Course;

module.exports.getAll = async (query, select, offset, limit) => {
    return Course.find(query, select).limit(offset).skip(limit);
}

module.exports.getById = async (courseId,  query, select) => {
    return Course.find({...query, "_id": ObjectId(courseId)}, select);
}

module.exports.update = async (courseId, courseParam) => {
    Course.update({"_id": ObjectId(courseId)},{$set: courseParam});
}

module.exports.delete = async (courseId) => {
    Course.remove({"_id": ObjectId(courseId)});
}

module.exports.create = async (courseParam) => {
    var course = new Course(courseParam);
    await course.save();
    // // validate
    // if (await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    // const user = new User(userParam);

    // // hash password
    // if (userParam.password) {
    //     user.password = bcrypt.hashSync(userParam.password, 10);
    // }

    // // save user
    // await user.save();
}