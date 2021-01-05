var nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user : "derekzohar.lol@gmail.com",
        pass : "derekzohar.lol123"
    }
});

