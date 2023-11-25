import "dotenv/config";
import mongoose from "mongoose";

/**
 * Mongodb connection string
 */
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Successfully connect to database"))
    .catch((err) => console.error("Failed to connect to database: ", err));
