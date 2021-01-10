const db = require('../helpers/mongo_db_connectivity');
const { isValidObjectId } = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const User = db.User;

const courseService = require('../services/course.service');

module.exports.getById = async ({ _id }) => {
  if (_id) {
    const user = await User.findOne({ _id });
    if (user)
      return _.omit({
        ...user.toJSON()
      }, 'password', 'watchList');
  }
  else {
    return;
  }
}

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}

module.exports.update = async (userId, updateParam) => {
  await User.findByIdAndUpdate(ObjectId(userId), clean(updateParam));
}

module.exports.getWatchList = async ({ _id }) => {
  if (_id) {
    const user = await User.findOne({ _id });
    if (user)
      return courseService.getByIds(user.toJSON().watchList);
  }
  else {
    return;
  }
}

module.exports.addToWatchList = async ({_id, courseId}) => {
  try{
    if (!_id || !courseId) {
      return false;
    }
      const user = await User.findOne({ _id });

      if(!user){
        return false;
      }
      
      if(user.watchList.includes(courseId))
        return false;

      await user.watchList.push(courseId);
      await user.save();
      return true;
  }
  catch (e){
    console.log(e);
    return false;
  }
}

module.exports.removeFromWatchList = async ({_id, courseId}) => {
  try{
    if (!_id || !courseId) {
      return false;
    }
      const user = await User.findOne({ _id });

      if(!user){
        return false;
      }
      
      if(!user.watchList.includes(courseId))
        return false;

      await user.watchList.pull(courseId);
      await user.save();
      return true;
  }
  catch (e){
    console.log(e);
    return false;
  }
}