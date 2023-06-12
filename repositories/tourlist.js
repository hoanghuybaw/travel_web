import { TourList } from "../models/index.js";
import Exception from "../exception/Exception.js";

const getAllTourList = async ({
    page, size, searchString,
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address constains searchString
    debugger
    let filteredTourList = await TourList.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: {$regex: `.*${searchString}.*`}
                    },
                    {
                        timeStart: {$regex: `.*${searchString}.*`}
                    },
                    {
                        timeStart: {$regex: `.*${searchString}.*`}
                    },
                ]
            }
        },
        // {
        //     $skip: page - 1 * size
        // },
        { $limit: size },
    ])
    return filteredTourList
}

//
const insertToulist = async ({
    name,
    address,
    price,
    numberPeople,
    timeStart,
    timeTo,
    detail }) => {
    try {
        debugger
        const toulist = await TourList.create({
            name,
            address,
            price,
            numberPeople,
            timeStart,
            timeTo,
            detail
        })
        return toulist
    } catch (exception) {
        //error from validation
        if (!!exception.errors) {
            throw new Exception('input error: ', exception.errors)
        }
        debugger
    }
    debugger
    console.log('insert tourlist');
}

// function generateFakeTourlist() {
//     for(let i = 0; i<1000; i++) {
//         TourList.create({
//             name: `${faker.name.findName()}-fake`,
//             email: faker.internet.email(),
//             languages: [
//                 faker.helpers.arrayElement(['English', 'Vietnamese', 'French']),
//                 faker.helpers.arrayElement(['Korean', 'Japanese', 'Chinese'])
//             ],
//             gender: faker.helpers.arrayElement(['Male', 'Female'])
//         })
//     }
// }

export default {
    getAllTourList,
    insertToulist,
}