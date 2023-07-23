import HttpStatusCode from "../exception/HttpStatusCode.js";
import Jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  const url = req.url 
  const url_index = url.indexOf('reset-password/') + 'reset-password/'.length;
  let url_string = url.slice(url_index);
  // bypass login, register
  if (
    req.url.toLowerCase().trim() == "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/tourlist".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/forgot-password".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == `/users/reset-password/${url_string}`.toLowerCase().trim()
  ) {
    next();
    return;
  }
  //other request
  //get and validate token
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = Jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "token is expired",
      });
      res.end();
    } else {
      next();
      return;
    }
    // return
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
}
