import eh from "../utils/errorHandlers.js";
import * as imgs from "../services/storage.js";
import serv from "../services/mediaServices.js"
import Utils from '../utils/utils.js'

export default {
  getImagesController: eh.catchAsync(async (req, res) => {//Images
    const response = await imgs.getImages();
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  deleteImagesController: eh.catchAsync(async (req, res) => {//Images
    const { id } = req.params;
    const response = await imgs.deleteImage(id, true);
    return Utils.responder(res, 200, true, 'Elemento borrado', response)
  }),
  createMediaController: eh.catchAsync(async (req, res)=>{
    const newData = req.body;
    const response = await serv.createMedia(newData)
    return Utils.responder(res, 201, true, 'Creacion exitosa', response)
  }),
  getMediaController: eh.catchAsync(async (req, res)=>{
    const isAdmin = false;
    const response = await serv.getMedia(isAdmin)
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  getAdminMediaController: eh.catchAsync(async (req, res)=>{
    const isAdmin = true;
    const response = await serv.getMedia(isAdmin)
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  getByIdMediaController: eh.catchAsync(async (req, res)=>{
    const {id}=req.params;
    const response = await serv.getMediaById(id)
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  updateMediaController: eh.catchAsync(async (req, res)=>{
      const {id}= req.params;
      const newData = req.body;
      const response = await serv.updateMedia(id, newData)
      return Utils.responder(res, 200, true, 'Actualizacion exitosa', response)
  }),
  deleteMediaController: eh.catchAsync(async (req, res)=>{
    const {id} = req.params;
    const response = await serv.deleteMedia(id)
    return Utils.responder(res, 200, true, 'Elemento borrado', response)
  }),
};
