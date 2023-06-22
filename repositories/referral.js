import { BookingTour } from "../models/index.js";
import Exception from "../exception/Exception.js";

const getReferralfromBooking = async ({
    page, size, refCode,
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address constains searchString
    debugger
    let filteredRefferral = await BookingTour.aggregate([
        {
            $match: {
                $or: [
                    {
                        refCode: {$regex: `.*${refCode}.*`}
                    },
                ]
            }
        },
        // {
        //     $skip: page - 1 * size
        // },
        { $limit: size },
    ])
    return filteredRefferral
}


export default {
    getReferralfromBooking,
}