import { body, validationResult } from 'express-validator'
const getListTourlist = async (req, res) => {
    res.status(200).json({
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
    res.send('insert tourlist')
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