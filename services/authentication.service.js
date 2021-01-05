const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/mongo_db_connectivity');
const mailer = require('../helpers/mailer.helper');
const { isValidObjectId } = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 
const User = db.User;

const otpService = require('../services/otp.service');

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

module.exports.authenticateOTP = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {     
        return await otpService.generateOtp(user);   
    }
}

module.exports.verifyOTP = async ({ username, otp }) => {
    const user = await User.findOne({ username });
    if (user) {
        if(await otpService.verifyOtp(otp,user._id)){
            const token = jwt.sign({ sub: user.id, role: user.roleId }, config.secret, { expiresIn: '7d' });
            return _.omit({
                ...user.toJSON(),
                token
            },'password');
        }
    }
}

module.exports.verifyToken = (token) => {
    var verified = true;

    try{
        jwt.verify(token,config.secret);
    }
    catch(e){
        console.log(e);
        verified = false;
    }

    return verified;
}

module.exports.getById = async (condition) => {
    if(condition)
        return await User.findOne(condition);
    else
        return undefined;
}

module.exports.create = async (userParam) => {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Username "' + email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

module.exports.update = async (userId,updateParam) => {
    User.update({"_id": ObjectId(userId)},updateParam);
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