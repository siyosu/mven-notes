import cors from "cors";
import { Router } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import auth from "./auth.js";
import notes from "./notes.js";
const router = Router();

router.use(cors({ origin: "*" }));
router.use("/auth", auth);
router.use("/notes", notes);

router.use((req, res, next) => {
    next(createHttpError(404));
});

router.use((err, req, res, next) => {
    const status = err.status ?? 500;
    const error = { message: err.message ?? "Unknown error occurred" };
    err.errors && (error.errors = err.errors);

    if (err instanceof jwt.JsonWebTokenError) {
        res.status(401).send({ message: "Unauthorized" });
    } else {
        res.status(status).send(error);
    }
});

export default router;
