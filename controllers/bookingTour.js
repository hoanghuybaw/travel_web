import HttpStatusCode from "../exception/HttpStatusCode.js";
import Createbooking from "../repositories/bookingTour.js";
import { MAX_RECORDS } from "../Global/constants.js";

const insertbooking = async (req, res) => {
  try {
    debugger
    const booking = await Createbooking.Createbooking(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Insert toulist success",
      data: booking,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot insert toulist:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const getListBookingTour = async (req, res) => {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredBookingTour = await Createbooking.getAllBookingTour({
      size,
      page,
      searchString: searchString,
    });
    debugger;
    res.status(HttpStatusCode.OK).json({
      message: "get booking list sucessfully",
      size: filteredBookingTour.length,
      searchString,
      page,
      data: filteredBookingTour,
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

export default {
  insertbooking,
  getListBookingTour,
};
