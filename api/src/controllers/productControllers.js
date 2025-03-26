import eh from "../utils/errorHandlers.js";
import serv from "../services/productServices.js";
import Utils from '../utils/utils.js'

export default {
  createController: eh.catchAsync(async (req, res) => {
    const { title, landing, info_header, info_body, items } = req.body;
    const response = await serv.createProduct(
      title,
      landing,
      info_header,
      info_body,
      items
    );
    return Utils.responder(res, 201, true, 'Creacion exitosa', response);
  }),

  createItemController: eh.catchAsync(async (req, res) => {
    const { img, text, id } = req.body;
    const response = await serv.addNewItem(img, text, id);
    return Utils.responder(res, 201, true, 'Creacion exitosa', response)
  }),

  delController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await serv.delProduct(id);
    return Utils.responder(res, 200, true, 'Elemento borrado', response)
  }),

  delItemController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await serv.delItem(id);
    return Utils.responder(res, 200, true, 'Elemento borrado', response)
  }),

  updController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const response = await serv.updProduct(id, newData);
    return Utils.responder(res, 200, true, 'Actualizacion exitosa', response)
  }),

  detailUpdController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const response = await serv.updItem(id, newData);
    return Utils.responder(res, 200, true, 'Actualizacion exitosa', response)
  }),

  getProductHand: eh.catchAsync(async (req, res) => {
    const admin = req.admin;
    const response = await serv.getProduct(admin);
    if (response.cache === true) {
      return Utils.responder(res, 203, true, 'Elemento hallado', response.products)
    } else {
      return Utils.responder(res, 200, true, 'Elemento hallado', response.products)
    }
  }),

  getProductById: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const admin = req.admin;
   console.log('soy el admin: ',admin)
    const response = await serv.getById(id, admin);
    return Utils.responder(res, 200, true, null, response)
  }),

  getItemById: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const admin = req.admin;
    const response = await serv.getDetail(id, admin);
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
};
