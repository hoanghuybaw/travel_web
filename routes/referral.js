import express from "express";
const router = express.Router();
import { referralController } from "../controllers/index.js";

router.get("/getRef" , referralController.getListRef)

export default router;