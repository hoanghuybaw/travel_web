import express from "express";
const router = express.Router();
import { Country } from "../models/index.js";
import { countryController } from "../controllers/index.js";

router.get("/getall" , countryController.getListContry)
router.post("/insert", (req, res) => {
    const {
      name,
      code,
    } = req.body;
    const newCountry = new Country({
      name,
      code,
    });
    newCountry.save((err, Country) => {
      if (err) {
        debugger;
        res.status(500).json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: "County inser success", Country });
      }
    });
  });

export default router;