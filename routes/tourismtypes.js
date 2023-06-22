import express from "express";
const router = express.Router();
import { TourismTypes } from "../models/index.js";

// router.get("/getall" , countryController.getListContry)
router.post("/insert", (req, res) => {
    const {
      name,
      location,
    } = req.body;
    const newTourismTypes = new TourismTypes({
      name,
      location,
    });
    newTourismTypes.save((err, Country) => {
      if (err) {
        debugger;
        res.status(500).json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: "Tourism Types inser success", Country });
      }
    });
  });

export default router;