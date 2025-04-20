import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

// Loaduing environment variables
dotenv.config({ path: "./.env" });

// Connecting to database and start server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
        console.log(`✅ Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to database:",err);
        process.exit(1);
    });
