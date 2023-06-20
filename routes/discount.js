import express from "express";
const router = express.Router();
import { Discount } from "../models/index.js";
import { discountController } from "../controllers/index.js";

router.get("/getall" , discountController.getListDiscount)
router.post("/insert", (req, res) => {
    const {
      name,
      code,
      percentDiscount,
    } = req.body;
    const newDiscount = new Discount({
      name,
      code,
      percentDiscount
    });
    newDiscount.save((err, Country) => {
      if (err) {
        debugger;
        res.status(500).json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: "Discount insert success", Country });
      }
    });
  });

export default router;