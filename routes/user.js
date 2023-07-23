import express from "express";
import { body, validationResult } from "express-validator";
import { userController } from "../controllers/index.js";
const router = express.Router()

router.get("/", userController.getDetailUser);
router.get("/getall", userController.getAllUser);

router.get("/", userController.getDetailUser);
router.get("/getall", userController.getAllUser);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);

router.post("/register", userController.register);

router.post("/forgot-password", userController.forgotUser);

router.post("/reset-password/:token", userController.resetPassword)

export default router;
