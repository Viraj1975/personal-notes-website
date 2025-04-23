import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config();

const startServer = async () => {
    try{
        await connectDB();
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on PORT: ${process.env.PORT}`);
        });
    }catch(error){
        console.error("Failed to start server:",error);
    }
};
export default startServer();