import { Country } from "../models/index.js";
import Exception from "../exception/Exception.js";

const getAllCountry = async ({
    page, size, searchString,
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address constains searchString
    debugger
    let filteredCountry = await Country.aggregate([
        {
            $match: {
                // $or: [
                //     {
                //         name: {$regex: `.*${searchString}.*`}
                //     },
                //     {
                //         timeStart: {$regex: `.*${searchString}.*`}
                //     },
                //     {
                //         timeStart: {$regex: `.*${searchString}.*`}
                //     },
                // ]
            }
        },
        // {
        //     $skip: page - 1 * size
        // },
        { $limit: size },
    ])
    return filteredCountry
}


export default {
    getAllCountry,
}