const createHttpError = require('http-errors');
const User = require('../../models/User.js');
const crypto = require('crypto');
const sendMail = require('../../services/email.js');
async function forgetPassword(body) {

        const { email } = body;
        const user = await User.findOne({ email });
        if (!user) throw new createHttpError(404, "user with this email not found ");

        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + (15 * 60 * 1000);
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        console.log('resetLink :>> ', resetLink);
    

        const mailOptions = {
            to: email,
            subject: "Reset Password Link" ,
            TEMPLATE: 'forget-password-email',
            data: {
                resetLink: resetLink,
                name: user.firstName
            }    
        }
        await sendMail(mailOptions);
        return "check your mail for reset password link";
}
module.exports = forgetPassword;

