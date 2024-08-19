import mongoose from "mongoose";

const connectDB = async function () {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo DB connected ${conn.connection.host}`)

    } catch (error) {
        console.log(`Mongodb Error :`, error)
        process.exit(1)
    }
};


export default connectDB;