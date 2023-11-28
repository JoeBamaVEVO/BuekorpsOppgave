import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const JWTAdmin = (req, res, next) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEJydWtlcmUiOjEsIkJydWtlcm5hdm4iOiJ0ZXN0IiwiRW1haWwiOiJrZ0BnbWFpbC5jb20iLCJQYXNzb3JkIjoiJDJiJDEwJDVyMFM1eWtuN2hjVE9HQ1N6OTR1YWV2aVpYQTBBbi5jVU5PaDIxYWIxZ1c3RDJqR2lld3IuIiwiaXNBZG1pbiI6MSwiaWF0IjoxNzAxMTg0MzkyLCJleHAiOjE3MDExODc5OTJ9.C-ZubBPubTON7R93jeTAn_YRKEGdz8FsZ6e3LFBn0RA";
    const bruker = jwt.verify(token, process.env.JWT_SECRET);
    let bruh = bruker.isAdmin;
    let bruh2 = JSON.stringify(bruh);
    res.send(bruh2);
};