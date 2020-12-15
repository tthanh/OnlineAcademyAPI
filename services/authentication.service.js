const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/mongo_db_connectivity');
const { isValidObjectId } = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 
const User = db.User;

module.exports.authenticate = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id, role: user.roleId }, config.secret, { expiresIn: '7d' });
        return _.omit({
            ...user.toJSON(),
            token
        },'password');
    }
}

module.exports.getById = async (condition) => {
    if(condition)
        return await User.findOne(condition);
    else
        return undefined;
}

module.exports.create = async (userParam) => {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

module.exports.update = async (userId,userParam) => {
    User.update({"_id": ObjectId(userId)},{$set: userParam});
}

module.exports.changePassword = async ({username,oldPassword,newPassword}) => {
    var result = false;

    do {
        if (!oldPassword || !newPassword) {
            break;
        }

        var user = await User.findOne({ username: username });
        if(!user){
            break;
        }
        
        if(user.password !== bcrypt.hashSync(oldPassword, 10)){
            break;
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        
        await user.save();
    }
    while(false);
    
    return result;
}