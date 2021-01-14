const db = require('../../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const prefixKeys = require("prefix-keys");
const Enrollment = db.Enrollment;
const courseService = require("../course.service");


module.exports.getAll = async (courseId, offset, limit) => {
    return await courseService.getById(courseId,undefined,"enrollment");
}

module.exports.getById = async (courseId, userId) => {
    const enrollmentResult = await courseService.getById(courseId, {"enrollment.userId":userId},{"enrollment.$":1});
    if(enrollmentResult){
        return enrollmentResult.enrollment[0];
    }
}

module.exports.delete = async (courseId, enrollmentId) => {
    const course = await courseService.getById(courseId);
    course.feedback.pull({"_id": enrollmentId});
    course.save();
}

module.exports.create = async (courseId, userId) => {
    const enrollment = new Enrollment({userId,courseId});
    console.log(enrollment);
    const course = await courseService.getById(courseId);
    if(course.enrollment === undefined){
        course.enrollment = [];
    }    
    course.enrollment.push(enrollment);
    course.save();  
}