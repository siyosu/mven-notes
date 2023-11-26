import "dotenv/config";
import express from "express";
import morgan from "morgan";
import "./config/database.js";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
