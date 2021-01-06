const db = require('../helpers/mongo_db_connectivity');
const { isValidObjectId } = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 
const User = db.User;

module.exports.getById = async ({userId}) => {
    if({userId}){
        const user = await User.findOne({userId});

        if(user)
            return _.omit({
                ...user.toJSON()
            },'password','watchList');
    }
    else{
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

module.exports.update = async (userId,updateParam) => {
    await User.findByIdAndUpdate(ObjectId(userId),clean(updateParam));
}