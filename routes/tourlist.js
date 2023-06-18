import express from "express";
const router = express.Router();
import { tourlistController } from "../controllers/index.js";
import { TourList } from "../models/index.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, filename);
    },
  });
  
const upload = multer({ storage });

router.get("/", tourlistController.getListTourlist);

router.get("/:id",  (req, res) => {
    const tourId = req.params.id;
  
    TourList.findById(tourId, (err, tour) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!tour) {
        res.status(404).json({ error: 'Tour not found' });
      } else {
        res.json(tour);
      }
    });
  });

router.post("/insert", upload.array('images', 5), (req, res) => {
  const {
    name,
    destination,
    price,
    numberPeople,
    timeStart,
    timeTo,
    detail,
    Service,
    day,
    night,
    priceChildren,
    thumbNail,
  } = req.body;
  const images = req.files.map((file) => file.filename);
  const newTour = new TourList({
    name,
    destination,
    price,
    numberPeople,
    timeStart,
    timeTo,
    detail,
    Service,
    day,
    night,
    priceChildren,
    thumbNail,
    images,
  });
  newTour.save((err, tour) => {
    if (err) {
        debugger
      res.status(500).json({ success: false, message: err.message });
    } else {
      res.json({ success: true, message: "Thêm mới tour thành công", tour });
    }
  });
});

router.post("/update", tourlistController.updateDateTourList);

export default router;
