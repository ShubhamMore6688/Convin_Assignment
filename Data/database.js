import mongoose from "mongoose";

// mongodb database connection
const connectDB = () => mongoose.connect(process.env.DB_URL, {dbName: "convin"}).then(()=>{
    console.log("database connected successfully");
})
export default connectDB;