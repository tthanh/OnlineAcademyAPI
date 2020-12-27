const db = require('../../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Feedback = db.Feedback;
const courseService = require("../course.service");


module.exports.getAll = async (courseId, offset, limit) => {
    return await courseService.getById(courseId,undefined,"feedback");
}

module.exports.getById = async (courseId, feedbackId) => {
    const feedbackResult = await courseService.getById(courseId, {"feedback._id":lessonId},{"feedback.$":1});
    if(feedbackResult){
        return feedbackResult.feedback[0];
    }
}

module.exports.update = async (courseId, feedbackId, feedbackParam) => {
    await courseService.update(courseId, {"feedback._id":feedbackId},{$set:prefixKeys("feedback.$.",feedbackParam)});
}

module.exports.delete = async (courseId, feedbackId) => {
    const course = await courseService.getById(courseId);
    course.feedback.pull({"_id": feedbackId});
    course.save();
}

module.exports.create = async (courseId, feedbackParam) => {
    const feedback = new Feedback(feedbackParam);
    const course = await courseService.getById(courseId);
    course.feedback.push(feedback);
    course.save();  
}