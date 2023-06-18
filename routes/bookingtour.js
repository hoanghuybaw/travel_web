import express from "express";
const router = express();
import { bookingTourController } from "../controllers/index.js";

router.post('/', bookingTourController.insertbooking);
router.get('/getall', bookingTourController.getListBookingTour);

export default router;
