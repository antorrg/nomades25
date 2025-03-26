import express from 'express'
import ctr from '../controllers/landingController.js'
import auth from '../middlewares/validation/sessionMiddle.js'
import {validateFields, middIntId} from "../middlewares/baseMiddFunctions.js"

const landCreate = [{name:'title', type:'string'}, {name:'image', type:'string'}, {name:'info_header', type:'string'}, {name:'description', type:'string'},{name: 'useImg', type:'boolean'}]
const landUpdate = [{name:'title', type:'string'}, {name:'image', type:'string'}, {name:'info_header', type:'string'}, {name:'description', type:'string'}, {name:'saver', type: 'boolean'}, {name: 'useImg', type:'boolean'},{name: 'enable', type: 'boolean'}]


const landingRouter = express.Router()

landingRouter.post('/land', auth.verifyToken, validateFields(landCreate), ctr.createLandingController)

landingRouter.post("/land/emails", ctr.emailLandingController); //Ruta de subida de imagenes

landingRouter.put('/land/:id', auth.verifyToken, middIntId, validateFields(landUpdate), ctr.updLandingController)

landingRouter.delete('/land/:id', auth.verifyToken, middIntId, ctr.deleteLandingController)

landingRouter.get('/land', auth.setAdminVar, ctr.getLandingController)//Ruta libre, solo verifica

landingRouter.get('/land/:id', auth.verifyToken, middIntId, ctr.detailLandingController)

export default landingRouter;