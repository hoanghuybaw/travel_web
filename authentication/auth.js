import HttpStatusCode from "../exception/HttpStatusCode.js";
import Jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  const url = req.url;
  const url_index_password = url.indexOf("reset-password/") + "reset-password/".length;
  const url_index_tourlist = url.indexOf("tourlist/") + "tourlist/".length;
  let url_string_password = url.slice(url_index_password);
  let url_string_tourlist = url.slice(url_index_tourlist);
  // bypass login, register
  if (
    req.url.toLowerCase().trim() == "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/tourlist".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == `/tourlist/${url_string_tourlist}`.toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/users/forgot-password".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      `/users/reset-password/${url_string_password}`.toLowerCase().trim()
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
