import express from "express";
const router = express.Router()
import {tourlistController} from '../controllers/index.js'

router.get('/', tourlistController.getListTourlist)

router.get('/:id', tourlistController.getListTourlistById)

router.post('/insert', tourlistController.insertToulist )

router.post('/update', tourlistController.updateDateTourList)


export default router