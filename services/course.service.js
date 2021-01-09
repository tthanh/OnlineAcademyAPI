const db = require('../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Course = db.Course;
const Category = db.Category;
const Enrollment = db.Enrollment;

module.exports.getAll = async (offset, limit) => {
    var courses = await Course.aggregate([
        { 
          "$lookup":{
            from: "users",
            localField: "teacherId",
            foreignField: "_id",
            as: "teacher"
          }
        },
        { 
          "$lookup":{
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          "$project":{
            "category.subCategories": 0,
            "feedback": 0,
            "lessons": 0,
            "categoryId": 0,
            "teacher.verified": 0,
            "teacher.watchList": 0,
            "teacher.verified": 0,
            "teacher.password": 0,
            "teacher.birthDate": 0,
            "teacher.roleId": 0,
            "teacher.createdDate": 0        
          }
        },
        {"$unwind": "$teacher"},
        {"$unwind": "$category"}
        ]).limit(limit).skip(offset);

        return courses;
}

module.exports.getById = async (courseId,  query, select) => {
    return await Course.findOne({...query, "_id": ObjectId(courseId)}, select);
}

module.exports.getByIds = async (courseIds,  query, select) => {
    var courses = await Course.aggregate([
        {
            "$match":{
                "_id": { $in : courseIds.map(x =>ObjectId(x)) }
            }
        },
        { 
          "$lookup":{
            from: "users",
            localField: "teacherId",
            foreignField: "_id",
            as: "teacher"
          }
        },
        { 
          "$lookup":{
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          "$project":{
            "category.subCategories": 0,
            "feedback": 0,
            "lessons": 0,
            "categoryId": 0,
            "teacher.verified": 0,
            "teacher.watchList": 0,
            "teacher.verified": 0,
            "teacher.password": 0,
            "teacher.birthDate": 0,
            "teacher.roleId": 0,
            "teacher.createdDate": 0        
          }
        },
        {"$unwind": "$teacher"},
        {"$unwind": "$category"}
        ]);

        return courses;
}

module.exports.update = async (courseId, query, updateParam) => {
    await Course.updateOne({...query, "_id": ObjectId(courseId)}, updateParam);
}

module.exports.delete = async (courseId) => {
    Course.remove({"_id": ObjectId(courseId)});
}

module.exports.create = async (courseParam) => {
    try{
        var course = new Course(courseParam);
        await course.save();
        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

module.exports.enrollCourse = async (courseId, userId) => {
    try{
        var enrollment = new Enrollment({ "courseId": courseId,"userId": userId});
        await enrollment.save();
        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

module.exports.unenrollCourse = async (courseId, userId) => {
    try{
        await Enrollment.deleteOne({"courseId": ObjectId(courseId),"userId": ObjectId(userId)});
        return true;
    }
    catch(e){
        return false;
    }
}

module.exports.search = async (keyword, offset, limit) => {
    return await Course.find({$text: {$search: keyword}},).limit(limit).skip(offset);
}