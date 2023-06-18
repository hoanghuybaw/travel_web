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

const getDetailTourlist = async(tourListId) => {
    const tour = await TourList.findById(tourListId)
    debugger
    if (!tour) {
        throw new Exception('cannot find tour by', tourListId)
    }
    return tour // default value
}

//
const insertToulist = async ({
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
    thumbNail
 }) => {
    try {
        debugger
        const toulist = await TourList.create({
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
            thumbNail
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

const updateToulist = async ({
    id,
    name,
    address,
    price,
    numberPeople,
    timeStart,
    timeTo,
    detail }) => {
        const tour = await TourList.findById(id)
        debugger
        TourList.name = name ?? TourList.name
        TourList.address = address ?? TourList.numberPeople
        TourList.price = price ?? TourList.numberPeople
        TourList.numberPeople = numberPeople ?? TourList.numberPeople
        TourList.timeStart = timeStart ?? TourList.timeStart
        TourList.timeTo = timeTo ?? TourList.timeTo
        TourList.detail = detail ?? TourList.detail
        await TourList.save()
        return tour
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
    getDetailTourlist,
    updateToulist,
}