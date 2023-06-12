import { body, validationResult } from 'express-validator'
import HttpStatusCode from '../exception/HttpStatusCode.js'
import tourlist from '../repositories/tourlist.js'
import { MAX_RECORDS } from '../Global/constants.js'

const getListTourlist = async (req, res) => {
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
   try {
    let filteredTourlist = await tourlist.getAllTourList({
        size, page, searchString: searchString
    })
    res.status(HttpStatusCode.OK).json({
        message: 'get tourlist sucessfully',
        size: filteredTourlist.length,
        searchString,
        page,
        data: filteredTourlist,
    })
   } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message
    })
   }
    // res.status(500).json({
    //     message: 'cannot get tourlist',
    // })
}

const getListTourlistById = async (req, res) => {
    res.send('get tourlist by id' + req?.params?.id)
}

const insertToulist = async (req, res) => {
    try {
        const Toulist = await tourlist.insertToulist(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Insert toulist success',
            data: Toulist
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'cannot insert toulist:'+ exception,
            validationErrors: exception.validationErrors
        })
    }
}

const updateDateTourList = async (req, res) => {
    res.send('update tourlist')
}

export default {
    getListTourlist,
    getListTourlistById,
    insertToulist,
    updateDateTourList
}