import express from 'express'
import ctr from '../controllers/aboutController.js'
import auth from '../middlewares/validation/sessionMiddle.js'
import {validateFields, middIntId} from "../middlewares/baseMiddFunctions.js"

const workCreate = [{name:'title', tipe: 'string'}, {name:'image', type: 'string'}, {name:'text', type: 'string'}, {name:'useImg', type: 'boolean'}]
const workUpdate = [{name:'title', tipe: 'string'}, {name:'image', type: 'string'}, {name:'text', type: 'string'}, {name:'enable', type: 'boolean'}, {name:'saver', type:'boolean'}, {name:'useImg', type: 'boolean'}]

const aboutRouter = express.Router()

aboutRouter.post('/work/create', auth.verifyToken, validateFields(workCreate), ctr.workCreate)

aboutRouter.get('/work', auth.setAdminVar, ctr.workGet)

aboutRouter.get('/work/:id', auth.verifyToken, middIntId, ctr.workById)

aboutRouter.put('/work/:id', auth.verifyToken, middIntId, validateFields(workUpdate), ctr.workUpd)

aboutRouter.delete('/work/:id', auth.verifyToken, middIntId, ctr.workDelete)


export default aboutRouter;