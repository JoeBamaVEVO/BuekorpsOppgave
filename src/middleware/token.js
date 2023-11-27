import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


export const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const bruker = jwt.verify(token, process.env.JWT_SECRET);
        req.bruker = bruker;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/auth");
    }
};

