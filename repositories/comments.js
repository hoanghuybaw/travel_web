import { Comments } from "../models/index.js";

const getAllComments = async ({
    page, size, searchString,
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address constains searchString
    debugger
    let filteredComments = await Comments.aggregate([
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
    return filteredComments
}


export default {
    getAllComments,
}