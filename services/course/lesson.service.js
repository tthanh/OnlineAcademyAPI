const db = require('../../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Lesson = db.Lesson;

const courseService = require("../course.service");

module.exports.getAll = async (courseId, offset, limit) => {
    console.log(courseId);
    return await courseService.getById(courseId, select = "lessons");
}

module.exports.getById = async (courseId, lessonId) => {
    return Course.find({"_id": ObjectId(courseId)});
}

module.exports.update = async (courseId, lessonId, lessonParam) => {
    Course.update({"_id": ObjectId(courseId)},{$set: courseParam});
}

module.exports.delete = async (courseId, lessonId) => {
    Course.remove({"_id": ObjectId(courseId)});
}

module.exports.create = async (courseId, lessonId, lessonParam) => {
    var lesson = new Lesson(lessonParam);
    await lesson.save();
}