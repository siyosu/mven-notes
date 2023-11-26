import { Router } from "express";
import { checkSchema } from "express-validator";
import { newUserSchema, userLoginSchema } from "./validationSchema.js";
import { createNewUser, loginUser } from "../controllers/auth.js";

const auth = Router();

const use = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

auth.post("/register", checkSchema(newUserSchema), use(createNewUser));
auth.post("/login", checkSchema(userLoginSchema), use(loginUser));

export default auth;
