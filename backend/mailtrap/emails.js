import { mailtransport } from "./mailtrap.config.js"

export const sendVerificationToken = async(email,token) => {
    const recipient = [{email}]
    
    
    const mailOptions = {
        from: 'jeettest1@yopmail.com',
        to: email,
        subject: 'Verification token',
        text: `Your verification token is : ${token}`
    };
    
    // Send the email
    mailtransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    
}

export const sendPasswordResetEmail= async(email,reseturl) => {
    const recipient = [{email}]
    
    
    const mailOptions = {
        from: 'jeettest1@yopmail.com',
        to: email,
        subject: 'Forgot Password',
        text: `Your verification token is : ${reseturl}`
    };
    
    // Send the email
    mailtransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    
}