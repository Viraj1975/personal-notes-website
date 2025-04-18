import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Loading environment variables
import dotenv from "dotenv";
dotenv.config();

const app = express();

// --- MIDDLEWARE ---

// Enabling CORS for the frontend (e.g. http://localhost:5173)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// Parse JSON and URL‑encoded bodies
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true,limit: "16kb"}));

// Parse cookies
app.use(cookieParser());

// Serve uploaded files statically from /uploads
app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));

// --- ROUTES ---

import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";  // make sure you create this!

// User routes (register, login, profile, etc.)
app.use("/api/v1/users",userRouter);

// Note routes (CRUD for notes, e.g. GET/POST /api/v1/notes)
app.use("/api/v1/notes",noteRouter);

// --- 404 HANDLER ---
app.use((req, res) => {
    res.status(404).json({message: "Not Found"});
});

// --- ERROR HANDLER ---
app.use((err,req,res,next) => {
    console.error(err);
    const status = err.statusCode || 500;
    res.status(status).json({message: err.message});
});

export {app};
