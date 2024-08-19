import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendPasswordResetEmail, sendVerificationToken } from '../mailtrap/emails.js';

export const login = async function (req, res) {

    const { email,password } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if(!user){
            res.status(400).json({success:false,message:"Invalid credentials"});    
        }

        const ispasswordValid = await bcryptjs.compare(password,user.password);
        if(!ispasswordValid) {
            res.status(400).json({success:false,message:"Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const signup = async function (req, res) {

    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            console.log("requiredd");
            
            throw new Error("All fields are required");
        }
    
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({success:false,message:'User already exists'});
        }
    
        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = generateVerificationCode();
        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();
        console.log(hashedPassword);

        // jwt
        generateTokenAndSetCookie(res, user._id);
   
        //send email
        await sendVerificationToken(user.email,verificationToken);
        

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            user: {
                ...user._docs,
                password: undefined
            }
        });
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }

}

export const verifyEmail = async function (req, res) {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt : Date.now() }
        });        

        console.log("user",user);
        

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid code"
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user: {
                ...user._doc,
                password:undefined
            }
        });

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
        
    }
}

export const forgotPassword = async function (req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({success:false,message:"Invalid email"});    
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success:true,message:"Mail send successfully "});

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const resetPassword = async function (req,res) {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if(!user){
            res.status(400).json({success:false,message:"Invalid token"});    
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({success:true,message:"Password reset successfully"});


    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const checkAuth = async function (req, res) {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        
    }
}

export const logout = async function (req, res) {
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logout successfully."});
}