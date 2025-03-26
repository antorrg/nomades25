import express from 'express'
import auth from '../../middlewares/validation/index.js'
import mid from '../../middlewares/middlewares.js'
import * as store from './testStore.js'
import { v4 as uuidv4 } from 'uuid';

const validServer = express()
validServer.use(express.json())
//validServer.use(auth.sessionMiddle)

validServer.post('/test/user/init', async(req, res) => {
    const response = { id: "a657ef72-bf73-4b34-b552-398a9a14925b", email: 'josenomeacuerdo@nose.com', role: 9 }
    const token = auth.generateToken(response);
   
    store.setToken(token); 
    store.setUserId(response.id)
    res.status(200).json({ message: 'Passed middleware', token })})

validServer.post('/test/user', auth.verifyToken, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

validServer.get('/test/user', auth.verifyToken, (req, res) => {
     const {userId, userRole}= req.userInfo
    res.status(200).json({userId, userRole})})

 
validServer.put('/test/user/:id', auth.verifyToken, mid.userChangePassMidd, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})
    
validServer.post('/test/user/midd', auth.verifyToken, mid.userVerifyPassMidd, (req, res) => {
         res.status(200).json({ message: 'Passed middleware' })})

validServer.use((err, req, res, next)=>{
    const status = err.status ||500
    const message = err.message || err.stack
    res.status(status).json(message)
})
export default validServer;

