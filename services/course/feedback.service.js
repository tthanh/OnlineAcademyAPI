const db = require('../../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Feedback = db.Feedback;

module.exports.getAll = async (courseId, offset, limit) => {
    return Course.find(condition).limit(offset).skip(limit);
}

module.exports.getById = async (courseId, feedbackId) => {
    return Course.find({"_id": ObjectId(courseId)});
}

module.exports.update = async (courseId, feedbackId, feedbackParam) => {
    Course.update({"_id": ObjectId(courseId)},{$set: courseParam});
}

module.exports.delete = async (courseId, feedbackId) => {
    Course.remove({"_id": ObjectId(courseId)});
}

module.exports.create = async (courseId, feedbackId, feedbackParam) => {
}