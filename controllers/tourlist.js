import { body, validationResult } from 'express-validator'
import HttpStatusCode from '../exception/HttpStatusCode.js'
import tourlist from '../repositories/tourlist.js'

const getListTourlist = async (req, res) => {
    res.status(HttpStatusCode.OK).json({
        message: 'get tourlist sucessfully',
        data: [
            {
                name: 'tour Hà Nội - Cát Bà',
                price: '8.000.000',
                time: '11/06/2023'
            },
            {
                name: 'tour Hà Nội - Hà Giang',
                price: '5.000.000',
                time: '11/06/2023'
            },
            {
                name: 'tour Hà Nội - Tp.HCM',
                price: '7.000.000',
                time: '11/06/2023'
            },
            {
                name: 'tour Hà Nội - Tp.HCM',
                price: '7.000.000',
                time: '11/06/2023'
            },
        ]
    })
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
            message: 'cannot insert student:'+ exception
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