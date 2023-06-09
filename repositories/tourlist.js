import { TourList } from "../models/index.js";
const getAllTourList = async ({
    page, size, searchString,
}) => {
    console.log('get list torlist with pagging');
}

//
const insertToulist = async ({
    name,
    address,
    price,
    numberPeople,
    timeStart,
    timeTo }) => {
    try {
        const toulist = await Tourlist.create({
            name,
            address,
            price,
            numberPeople,
            timeStart,
            timeTo
        })
        debugger
    } catch (exception) {
        debugger

    }
    console.log('insert tourlist');
}

export default {
    getAllTourList,
    insertToulist,
}