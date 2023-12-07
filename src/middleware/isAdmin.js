import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const JWTAdmin = (req, res, next) => {
    const token = req.cookies.token;
    const bruker = jwt.verify(token, process.env.JWT_SECRET);
    if (bruker.isAdmin) {
        next();
    } else {
        res.status(403).send("Du har ikke tilgang til denne siden");
    }
};