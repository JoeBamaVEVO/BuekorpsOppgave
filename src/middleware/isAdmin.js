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

export const checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        // let user =  
        res.locals.user = decodedToken;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};