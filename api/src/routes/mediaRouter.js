import express from 'express'
import media from '../controllers/mediaControllers.js'
import auth from '../middlewares/validation/sessionMiddle.js'
import {validateFields,middIntId} from "../middlewares/baseMiddFunctions.js"

const mediaCreate = [{name:'title', type: 'string'}, {name:'type', type: 'string'}, {name:'text', type: 'string'}, {name: 'url', type:'string'}, {name:'enable', type: 'boolean'}];
const mediaUpdate = [{name:'title', type: 'string'}, {name:'type', type: 'string'}, {name:'text', type: 'string'}, {name: 'url', type:'string'}, {name:'enable', type: 'boolean'}]


const mediaRouter = express.Router()
 //imagenes
mediaRouter.get('/media/imgs', auth.verifyToken, media.getImagesController)

mediaRouter.delete('/media/imgs/:id', auth.verifyToken,  middIntId, media.deleteImagesController)
//videos
mediaRouter.post('/media/videos/create', auth.verifyToken, validateFields(mediaCreate), media.createMediaController)

mediaRouter.get('/media/videos',  media.getMediaController)//Ruta libre

mediaRouter.get('/media/videos/:id',  middIntId, media.getByIdMediaController)//Ruta libre

mediaRouter.get('/media/admin/videos',auth.verifyToken, media.getAdminMediaController)

mediaRouter.put('/media/videos/update/:id',  auth.verifyToken,  middIntId, validateFields(mediaUpdate), media.updateMediaController)

mediaRouter.delete('/media/videos/:id',  auth.verifyToken, middIntId, media.deleteMediaController)

export default mediaRouter;