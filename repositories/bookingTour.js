import { BookingTour } from "../models/index.js";
import Exception from "../exception/Exception.js";


const Createbooking = async ({
    tourId,
    username,
    userId,
    price,
    note,
    phoneNumber,
    email,
    numberPeople,
    numberChildren,
    refCode }) => {
    try {
        debugger
        const Booking = await BookingTour.create({
            tourId,
            userId,
            price,
            note,
            username,
            phoneNumber,
            email,
            numberPeople,
            numberChildren,
            refCode
        })
        return Booking
    } catch (exception) {
        //error from validation
        if (!!exception.errors) {
            throw new Exception('input error: ', exception.errors)
        }
        debugger
    }
    debugger
}

const getAllBookingTour = async ({
    page, size, searchString,
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address constains searchString
    debugger
    let filteredBookingTour = await BookingTour.aggregate([
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
    return filteredBookingTour
}


export default {
    Createbooking,
    getAllBookingTour,
}