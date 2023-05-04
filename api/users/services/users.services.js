const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../models');

exports.registerService = async (data, callback) => {
    try {
        console.log('data.body------>>>', data.body);
        let { email, role } = data.body;
        let emailvalidation = await db.user.findOne({ where: { email: email }});
        if (emailvalidation) {
            return callback(null, {
                message: 'Email already exists',
                status_code: 400
            });
        }

        let passwordHash = await bcrypt.hash(data.body.password, 10);
        let insertObj = { 
            email: email,
            password: passwordHash,
            role: role
        }

        let insertedObj = await db.user.create(insertObj);

        return callback(null, {
            message: 'User created successfully',
            _id: insertedObj._id,
            status_code: 200
        });
    } catch (error) {
        return callback(error);
    }
}

exports.loginService = async (data, callback) => {
    try {
        let { email, password } = data.body;
        let emailvalidation = await db.user.findOne({ where: { email: email }});
        if (!emailvalidation) {
            return callback(null, {
                message: 'Incorrect e-mail',
                status_code: 400
            });
        }
        let userPassComapre = await bcrypt.compare(password, emailvalidation.password);
        if (!userPassComapre) {
            return callback(null, {
                message: 'Incorrect password',
                status_code: 400
            });
        }

        let token = jwt.sign( { email: email },  process.env.JWT_KEY, { expiresIn: '1h' } );
        return callback(null, {
            message: 'Welcome',
            _id: emailvalidation._id,
            name: emailvalidation.name,
            role: emailvalidation.role,
            token: token,
            status_code: 200 
        });
    } catch (error) {
        return callback(error);
    }
}

exports.forgotPasswordSendOTPService = async (data, callback) => {
    try {
        let { email } = data.body;
        let findEmail = await db.user.findOne({ where: { email: email }});
        if (!findEmail) {
            return callback(null, {
                message: 'E-mail not registerd',
                status_code: 400
            });
        }
        let start = 100000;
        let range = 999999;
        let OTPnum = +((Math.random() * range) + start).toFixed();
        await db.user.update({ otp: OTPnum }, { where: { _id: findEmail._id }});
        setTimeout(async () => { await db.user.update({ otp: null }, { where: { _id: findEmail._id } }) }, 60000);

        // let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // // secure: false, 
            // auth: {
            //     user: 'hanna13@ethereal.email',
            //     pass: '2QDMTJfHYxF4zUnPjq'
            // },

            // service: 'gmail',
            
            // host: "smtp.gmail.com",
            // port: 465,
            // secure: true, 
            
            // host: "smtp.gmail.com",
            // port: 587,
            // secure: false,         

            // host: 'imap.gmail.com',
            // port: 993,

            service: 'gmail',
            // secure: false, 
            auth: {
              user: 'race.india.coach@gmail.com', 
              pass: 'sgnbokldvqpkyezk', 
            },
        });

        console.log('email->>>>', email)
        let mailOptions = {
            // from: 'sarathkumar.ssb@gmail.com',
            from: 'race.india.coach@gmail.com',
            to: email,
            // to: 'race.india.coach@gmail.com',
            subject: "One Time Password",
            html: `<p><br/>Hey there,</p>
                    <p>We have recevied your request to reset password of your RACE INDIA COACK Login</p>
                    <p>Username: <b>${findEmail.name}</b></p>
                    <p>Use the <b>OTP - ${OTPnum}</b> to be reset your password</p>
                    <p><b><i>Note:</i></b> The OTP will remain valid for the next 1 Minute</p>
                    <p>Thank You</p>`
        }
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Mail error: ', error);
            } else {
                console.log('E-mial sent: ', info.response);
            }
        });

        return callback(null, {
            message: 'Success',
            expiry_time: 1,
            status_code: 200
        });
    } catch (error) {
        return callback(error);
    }
}

exports.OTPmatchService = async (data, callback) => {
    try {
        let { email, OTP } = data.body;
        if (!OTP) {
            return callback(null, {
                message: 'Please enter OTP',
                status_code: 400
            });
        }
        let emailvalidation = await db.user.findOne({ where: { email: email }});
        if (!emailvalidation) {
            return callback(null, {
                message: 'Email not registerd',
                status_code: 400
            });
        }
        if (emailvalidation.otp == OTP) {
            await db.user.update({ otp_verify: true }, { where: { _id: emailvalidation._id }});
            return callback(null, {
                message: 'OTP verified',
                status_code: 200
            });
        } else {
            return callback(null, {
                message: 'OTP not match',
                status_code: 400
            });
        }
    } catch (error) {
        return callback(error);
    }
}

exports.forgotPasswordUpdateService = async (data, callback) => {
    try {
        let { email, password } = data.body;
        let verifiedOTP = await db.user.findOne({ where: { email: email }});
        if (!verifiedOTP) {
            return callback(null, {
                message: 'Email not registerd',
                status_code: 400
            });
        }

        let passwordHashUpdate = await bcrypt.hash(password, 10);
        await db.user.update({ password: passwordHashUpdate }, { where: { _id: verifiedOTP._id } });

        // let testAccount = await nodemailer.createTestAccount();
        let transporter = await nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, 
            
            // host: "smtp.gamil.email",
            // port: 465,
            // secure: true, 

            service: 'gmail',
            //secure: false, 
            auth: {
              user: 'race.india.coach@gmail.com', 
              pass: 'sgnbokldvqpkyezk', 
            },
        });

        let mailOptions = {
            from: 'race.india.coach@gmail.com',
            to: email,
            subject: "Successful password Updation",
            html: `<p><br/>Hey there,</p>
                    <p>Your password has been  Updated Successfully RACE INDIA COACK Login</p>
                    <p>Username: <b>${verifiedOTP.name}</b></p>
                    <p>Thank You</p>`
        }
        
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Mail error: ', error);
            } else {
                console.log('E-mial sent: ', info.response);
            }
        });

        return callback(null, {
            message: 'Password updated successfully',
            status_code: 200
        });

    } catch (error) {
        return callback(error);
    }
}