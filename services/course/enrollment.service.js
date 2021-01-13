const db = require('../../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const prefixKeys = require("prefix-keys");
const Enrollment = db.Enrollment;
const courseService = require("../course.service");


module.exports.getAll = async (courseId, offset, limit) => {
    return await courseService.getById(courseId,undefined,"enrollment");
}

module.exports.getById = async (courseId, enrollmentId) => {
    const enrollmentResult = await courseService.getById(courseId, {"enrollment._id":enrollmentId},{"enrollment.$":1});
    if(enrollmentResult){
        return enrollmentResult.enrollment[0];
    }
}

module.exports.delete = async (courseId, enrollmentId) => {
    const course = await courseService.getById(courseId);
    course.feedback.pull({"_id": enrollmentId});
    course.save();
}

module.exports.create = async (courseId, enrollmentParam) => {
    const enrollment = new Enrollment(enrollmentParam);
    const course = await courseService.getById(courseId);
    course.enrollment.push(enrollment);
    course.save();  
}