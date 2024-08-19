import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailtransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});
