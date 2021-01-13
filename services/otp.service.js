const db = require('../helpers/mongo_db_connectivity');
const mailer = require('../helpers/mailer.helper');
const Otp = db.Otp;

module.exports.generateOtp = async (user) => {
    try{
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        var otp = new Otp({ "otp": otpCode,"userId": user._id});
        await otp.save();

        const mailOptions = {
            from: "derekzohar.lol@gmail.com",
            to: user.email,
            subject: "Your OTP for OnlineAcademy",
            html: `<p>Hi t0942842441@gmail.com</p> <br/>
                    <pre>Your OTP is ${otpCode}</pre><br/>
                    <pre>Cheers, OnlineAcademy Team</pre>`
        }

        mailer.transporter.sendMail(mailOptions,(mailerr,info)=> {
            if(mailerr){
                return true;
            }else{
                return false;
            }
        })

        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

module.exports.verifyOtp = async (otp, userId) => {
    try{
        const deleteResult = await Otp.deleteOne({"userId":userId,"otp":otp});
        
        if(deleteResult.deletedCount == 1){
            return true;
        }

        return false;
    }
    catch(e){
        return false;
    }
}


module.exports.sendNewPassword = async (user,newPassword) => {
    try{

        const mailOptions = {
            from: "derekzohar.lol@gmail.com",
            to: user.email,
            subject: "Your new password is",
            html: `<p>Hi t0942842441@gmail.com</p> <br/>
                    <pre>Your new password is ${newPassword}</pre><br/>
                    <pre>Cheers, OnlineAcademy Team</pre>`
        }

        mailer.transporter.sendMail(mailOptions,(mailerr,info)=> {
            if(mailerr){
                return true;
            }else{
                return false;
            }
        })

        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}
