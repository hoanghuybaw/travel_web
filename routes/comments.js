import express from "express";
const router = express();
import { Comments } from "../models/index.js";
import { commentsController } from "../controllers/index.js";

router.post("/insert", (req, res) => {
  const { UserId, name, TourId, numberPhone, commentsDetail } = req.body;
  const newComments = new Comments({
    UserId,
    name,
    numberPhone,
    commentsDetail,
    TourId,
  });
  newComments.save((err, Country) => {
    if (err) {
      debugger;
      res.status(500).json({ success: false, message: err.message });
    } else {
      res.json({ success: true, message: "Comments insert success", Country });
    }
  });
});
router.get("/getall", commentsController.getListComments);

export default router;
