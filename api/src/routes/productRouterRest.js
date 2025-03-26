import express from 'express'
import ctr from '../controllers/productControllers.js'
import auth from '../middlewares/validation/sessionMiddle.js'
import { validateFields, validateFieldsWithItems,middIntId } from "../middlewares/baseMiddFunctions.js"


const createProduct = [{name:'title', type: 'string'}, {name:'landing',type: 'string'}, {name:'info_header',type: 'string'}, {name:'info_body',type: 'string'}];
const createItemProd = [{name:'img', type: 'string'}, {name:'text', type: 'string'},]
const updateProduct = [{name:'title', type: 'string'}, {name:'landing',type: 'string'}, {name:'info_header',type: 'string'}, {name:'info_body',type: 'string'},{ name:'saver',type: 'boolean'}, {name:'useImg',type: 'boolean'},{name: 'enable', type: 'boolean'}];

const createItem = [{name:'img', type: 'string'}, {name:'text', type: 'string'}, {name:'id', type: 'int'}, {name:'useImg',type: 'boolean'}]
const updateItem = [{name:'img', type: 'string'}, {name:'text', type: 'string'}, {name:'id', type: 'int'}, { name:'saver',type: 'boolean'}, {name:'useImg',type: 'boolean'},{name: 'enable', type: 'boolean'}];


const productRouter = express.Router()

productRouter.post('/product/create', auth.verifyToken, auth.checkRole([0,2,9]), validateFieldsWithItems(createProduct, createItemProd, 'items'), ctr.createController)
productRouter.put('/product/:id', auth.verifyToken, auth.checkRole([0,2,9]), middIntId, validateFields(updateProduct), ctr.updController)
productRouter.delete('/product/:id', auth.verifyToken, auth.checkRole([0,9]), middIntId, ctr.delController)

productRouter.post('/product/item/create', auth.verifyToken, auth.checkRole([0,2,9]), validateFields(createItem), ctr.createItemController)
productRouter.put('/product/item/:id', auth.verifyToken, auth.checkRole([0,2,9]), middIntId, validateFields(updateItem), ctr.detailUpdController)
productRouter.delete('/product/item/:id', auth.verifyToken, auth.checkRole([0,2,9]), middIntId, ctr.delItemController)


productRouter.get('/product', auth.setAdminVar, ctr.getProductHand)// Ruta libre, solo verifica
productRouter.get('/product/:id', auth.setAdminVar, middIntId, ctr.getProductById)// Ruta libre, solo verifica
productRouter.get('/product/item/:id', auth.setAdminVar, middIntId, ctr.getItemById)// Ruta libre, solo verifica
export default productRouter;