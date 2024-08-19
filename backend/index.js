import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());// allow incoming request parse json
app.use(cookieParser());// allow parse icoming cookie

app.use("/api/auth", authRoutes)
app.listen(PORT, function () {
    connectDB();
    console.log("Server is running");
});