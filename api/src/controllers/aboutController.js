import work from '../services/ourWork.js'
import eh from '../utils/errorHandlers.js'
import Utils from '../utils/utils.js'


export default {
    workCreate : eh.catchAsync(async(req, res)=>{
        const newData = req.body;
        const response = await work.createWork(newData)
        return Utils.responder(res, 201, true, 'Creacion exitosa', response)
    }),
    workGet  : eh.catchAsync(async(req, res)=>{
        const admin = req.admin;
        const response = await work.getWork(admin)
        return Utils.responder(res, 200, true, 'Elemento hallado', response)
    }),
    workById : eh.catchAsync(async(req, res)=>{
        const {id}= req.params;
        const response = await work.workById(id)
        return Utils.responder(res, 200, true, 'Elemento hallado', response)
    }),
    workUpd : eh.catchAsync(async(req, res)=>{
        const {id}= req.params;
        const newData = req.body;
        const response = await work.updWork(id, newData)
        return Utils.responder(res, 200, true, 'Actualizacion exitosa', response)
    }),
    workDelete : eh.catchAsync(async(req, res)=>{
        const {id} = req.params;
        const response = await work.delWork(id)
        return Utils.responder(res, 200, true, 'Elemento borrado', response)
    }),
    
}