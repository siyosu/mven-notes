import "dotenv/config";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * Add a new user to the database and generate an access token
 */
export const createNewUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createHttpError(400, "Invalid input data", { errors: errors.mapped() });

    const { username, password } = req.body;
    const user = await User.create({ username, password });

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

    res.status(200).send({ ...payload, token });
};

const throwLoginError = () => {
    throw createHttpError(401, "Invalid username or password");
};

/**
 * Validate username and password, if the credential is valid, generate an access token
 */
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throwLoginError();

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throwLoginError();

    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) throwLoginError();

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

    res.status(200).send({ ...payload, token });
};
