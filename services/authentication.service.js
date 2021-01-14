const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/mongo_db_connectivity');
const mailer = require('../helpers/mailer.helper');
const { isValidObjectId } = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 
const User = db.User;

const otpService = require('../services/otp.service');

module.exports.authenticate = async ({ email, password }) => {
    if(!email){
        return;
    }

    if(!password){
        return;
    }

    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password) && user.verified) {
        const token = jwt.sign({ userId: user.id, roleId: user.roleId }, config.secret, { expiresIn: '7d' });
        return _.omit({
            ...user.toJSON(),
            token
        },'password');
    }
}

module.exports.verifyOTP = async ({ email, otp }) => {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
        if(await otpService.verifyOtp(otp,user._id)){
            user.verified = true;
            await user.save();
            return true;
        }
    }
    return false;
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

    console.log(userParam);
    if(userParam.roleId != 1 && userParam.roleId != 2)
    {
        throw "Wrong role id";
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    
    // save user
    await user.save();
    return await otpService.generateOtp(user);
}

module.exports.update = async (userId,{firstName, lastName, birthDate}) => {
    User.findByIdAndUpdate(ObjectId(userId),{...firstName,lastName,birthDate});
}

module.exports.changePassword = async ({userId, oldPassword,newPassword}) => {
    var result = false;

    do {
        if (!oldPassword || !newPassword) {
            break;
        }

        var user = await User.findOne({ "_id": userId });
        if(!user){
            break;
        }
        if(bcrypt.compareSync(oldPassword, user.password)){
            user.password = bcrypt.hashSync(newPassword, 10);
            await user.save();
        }
    }
    while(false);
    
    return result;
}

module.exports.forgotPassword = async ({email}) => {
    var result = false;

    do {
        var user = await User.findOne({email});
        if(!user){
            break;
        }

        const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
        await otpService.sendNewPassword(user,newPassword);

        user.password = bcrypt.hashSync(newPassword, 10);
        
        await user.save();
    }
    while(false);
    
    return result;
};