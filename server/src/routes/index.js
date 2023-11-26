import { Router } from "express";
import createHttpError from "http-errors";
import auth from "./auth.js";
const router = Router();

router.use("/auth", auth);

router.use((req, res, next) => {
    next(createHttpError(404));
});

router.use((err, req, res, next) => {
    const status = err.status ?? 500;
    const error = { message: err.message ?? "Unknown error occurred" };
    err.errors && (error.errors = err.errors);

    res.status(status).send(error);
});

export default router;
