const db = require('../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Course = db.Course;

module.exports.getAll = async (query, select, offset, limit) => {
    return Course.find(query, select).limit(offset).skip(limit);
}

module.exports.getById = async (courseId,  query, select) => {
    return await Course.findOne({...query, "_id": ObjectId(courseId)}, select);
}

module.exports.update = async (courseId, query, updateParam) => {
    await Course.updateOne({...query, "_id": ObjectId(courseId)}, updateParam);
}

module.exports.delete = async (courseId) => {
    Course.remove({"_id": ObjectId(courseId)});
}

module.exports.create = async (courseParam) => {
    var course = new Course(courseParam);
    await course.save();
}