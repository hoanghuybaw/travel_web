import HttpStatusCode from "../exception/HttpStatusCode.js";
import referral from "../repositories/referral.js";
import { MAX_RECORDS } from "../Global/constants.js";

const getListRef = async (req, res) => {
  let { page = 1, size = MAX_RECORDS, refCode = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  debugger
  try {
    let filteredRef = await referral.getReferralfromBooking({
      size,
      page,
      refCode: refCode,
    });
    debugger;
    res.status(HttpStatusCode.OK).json({
      message: "get ref list sucessfully",
      size: filteredRef.length,
      page,
      data: filteredRef,
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
    getListRef,
};
