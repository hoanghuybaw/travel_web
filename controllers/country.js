import HttpStatusCode from "../exception/HttpStatusCode.js";
import Country from "../repositories/country.js";
import { MAX_RECORDS } from "../Global/constants.js";

const getListContry = async (req, res) => {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredCountry = await Country.getAllCountry({
      size,
      page,
      searchString: searchString,
    });
    debugger;
    res.status(HttpStatusCode.OK).json({
      message: "get country list sucessfully",
      size: filteredCountry.length,
      searchString,
      page,
      data: filteredCountry,
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
  getListContry,
};
