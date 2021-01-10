const db = require('../../helpers/mongo_db_connectivity');
const prefixKeys = require("prefix-keys");
var ObjectId = require('mongodb').ObjectId; 
const Lesson = db.Lesson;
const courseService = require("../course.service");

module.exports.getAll = async (courseId, offset, limit) => {
    try{
        return await courseService.getById(courseId,undefined,"lessons");
    }
    catch(e){
        console.log(e);
    }
    while(false);
}

module.exports.getById = async (courseId, lessonId) => {
    const lessonResult = await courseService.getById(courseId, {"lessons._id":lessonId},{"lessons.$":1});
    if(lessonResult){
        return lessonResult.lessons[0];
    }
}

module.exports.update = async (courseId, lessonId, lessonParam) => {
    await courseService.update(courseId, {"lessons._id":lessonId},{$set:prefixKeys("lessons.$.",lessonParam)});
}

module.exports.delete = async (courseId, lessonId) => {
    try{
        const course = await courseService.getById(courseId);
        course.lessons.pull({"_id": lessonId});
        course.save();
        return true;
    }

    catch(e){
        console.log(e);
        return true;
    }
    
}

module.exports.create = async (courseId, lessonParam) => {
    const lesson = new Lesson(lessonParam);
    const course = await courseService.getById(courseId);
    course.lessons.push(lesson);
    course.save();
}