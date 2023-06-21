import HttpStatusCode from "../exception/HttpStatusCode.js";
import comments from "../repositories/comments.js";
import { MAX_RECORDS } from "../Global/constants.js";

const getListComments = async (req, res) => {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredComments = await comments.getAllComments({
      size,
      page,
      searchString: searchString,
    });
    debugger;
    res.status(HttpStatusCode.OK).json({
      message: "get comments list sucessfully",
      size: filteredComments.length,
      searchString,
      page,
      data: filteredComments,
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
  getListComments,
};
