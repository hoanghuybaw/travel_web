import { body, validationResult } from "express-validator";
import { userRepositories } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exception/HttpStatusCode.js";
import { MAX_RECORDS } from "../Global/constants.js";
import { User } from "../models/index.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  console.log(`they talk ablout: ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  //call repository
  try {
    let exsitingUser = await userRepositories.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: exsitingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    address,
    gender,
    permissionUser,
    refCode,
  } = req.body;
  myEvent.emit("event.register.user", req.body);
  try {
    let user = await userRepositories.register({
      name,
      email,
      password,
      phoneNumber,
      address,
      gender,
      permissionUser,
      refCode,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user successfully",
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getAllUser = async (req, res) => {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredUser = await userRepositories.getAllUser({
      size,
      page,
      searchString: searchString,
    });
    debugger;
    res.status(HttpStatusCode.OK).json({
      message: "get User sucessfully",
      size: filteredUser.length,
      searchString,
      page,
      data: filteredUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
  // res.status(500).json({
  //     message: 'cannot get tourlist',
  // })
};

const getDetailUser = async (req, res) => {};

const forgotUser = async (req, res) => {
  const { email } = req.body;
  try {
    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu hay không
    const user = await User.findOne({ email });

    if (!user) {
      // Email không tồn tại trong hệ thống
      return res.status(404).json({ error: "Email không hợp lệ" });
    }

    // Tạo mã đặt lại mật khẩu ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Lưu mã đặt lại mật khẩu và thời gian hết hạn vào tài khoản người dùng
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Hết hạn sau 1 giờ
    await user.save();

    // Gửi email xác nhận đặt lại mật khẩu đến địa chỉ email người dùng
    const transporter = nodemailer.createTransport({
      // Cấu hình gửi email, ví dụ: Gmail
      service: "Gmail",
      auth: {
        user: "hoanghuybaw@gmail.com",
        pass: "Huy_1199",
      },
    });

    const mailOptions = {
      from: "hoanghuybaw@gmail.com",
      to: email,
      subject: "Yêu cầu đặt lại mật khẩu",
      text:
        "Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n\n" +
        "Vui lòng nhấp vào liên kết sau đây để đặt lại mật khẩu:\n\n" +
        `http://localhost:8080/reset-password/${resetToken}\n\n` +
        "Liên kết này sẽ hết hạn sau 1 giờ.\n" +
        "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n",
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email xác nhận đã được gửi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Tìm người dùng với mã đặt lại mật khẩu hợp lệ và chưa hết hạn
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      // Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn
      return res
        .status(400)
        .json({ error: "Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn" });
    }

    // Mã đặt lại mật khẩu hợp lệ, thay đổi mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Mật khẩu đã được đặt lại" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
};
export default {
  login,
  register,
  getDetailUser,
  getAllUser,
  forgotUser,
  resetPassword,
};
