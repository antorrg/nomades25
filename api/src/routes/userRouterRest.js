import express from 'express'
import ctr from '../controllers/usersControllers.js'
import mdd from '../middlewares/middlewares.js'
import {validateFields, middUuid} from "../middlewares/baseMiddFunctions.js"
import auth from '../middlewares/validation/sessionMiddle.js'
import {createLogLimiter} from "../utils/rateLimits.js"

const userCreate = [{name:'email', type: 'string'}]
const userLogin = [{name:'email', type: 'string'}, {name:'password', type: 'string'}]
const userUpd = [{name:'email', type: 'string'}, {name:'given_name', type: 'string'}, {name:'picture', type: 'string'}, {name:'country', type: 'string'},]
const userUpgrade = [{name:'role', type: 'string'}, {name:'enable', type: 'boolean'}]
const resetPassword = [{name:'id', type: 'string'}];
const changePassword = [{name:'password', type: 'string'}]



const logLimiter2 = createLogLimiter(2)//El numero es el tiempo de espera en minutos

const userRouter = express.Router()

userRouter.post('/user/create', auth.verifyToken,  auth.checkRole([0, 9]), validateFields(userCreate), mdd.createUser ,ctr.userCreateController)
userRouter.post('/user/login', logLimiter2, validateFields(userLogin), mdd.loginUser ,ctr.loginController)
userRouter.get('/user',  auth.verifyToken, auth.checkRole([0, 9]), ctr.getUserController)
userRouter.get('/user/:id', auth.verifyToken, middUuid, ctr.getUserByIdController)
userRouter.put('/user/updprofile/:id', auth.verifyToken, middUuid, validateFields(userUpd), ctr.updUserCtr)
userRouter.post('/user/update', auth.verifyToken,  mdd.userVerifyPassMidd, ctr.verifyPassCtr)
userRouter.put('/user/update/:id', auth.verifyToken,  middUuid, validateFields(changePassword), mdd.userChangePassMidd, ctr.changePassCtr)
userRouter.patch('/user/upgrade/:id', auth.verifyToken, auth.checkRole([0, 9]), middUuid, validateFields(userUpgrade), ctr.changeStateUserCtr)
userRouter.post('/user/change', auth.verifyToken, auth.checkRole([0, 9]), validateFields(resetPassword), ctr.resetPassCtr)
userRouter.delete('/user/:id', auth.verifyToken, middUuid, ctr.delUserCtr)

export default userRouter;