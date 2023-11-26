import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * Authentication middleware to verify access token. If the access token is invalid throw 401
 */
const authenticate = (req, res, next) => {
    const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!accessToken) throw createHttpError(401);

    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    req.user = payload;
    next();
};

export default authenticate;
