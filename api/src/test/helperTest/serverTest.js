import express from 'express'
import * as mid from '../../src/middlewares/middleware.js'
import * as user from '../../src/middlewares/baseMiddFunctions.js'
import auth from '../../src/middlewares/validation/index.js'
import * as store from './testStore.js'

const serverTest = express()
serverTest.use(express.json())

serverTest.post('/test/user/create', mid.loginUser, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.get('/test/users/:id', user.middUuid, (req, res) => {
        res.status(200).json({ message: 'Passed middleware' })})

serverTest.put('/test/user/:id', mid.updUserMidd, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.put('/test/user/:id', mid.upgradeUserMidd, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.post('/test/user', mid.userResetPassMidd, (req, res) => {
     res.status(200).json({ message: 'Passed middleware' })})

serverTest.post('/test/page', mid.createProduct, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.post('/test/item', mid.createItem, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.put('/test/item/:id', mid.updateItem, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.get('/test/:id', user.middIntId, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.put('/test/page/:id', mid.updProduct, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.post('/test/reset', mid.userResetPassMidd, (req, res)=>{
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.patch('/test/upgrade/:id', mid.upgradeUserMidd,(req, res)=>{
     res.status(200).json({ message: 'Passed middleware' })})

serverTest.get('/test/page/:id', mid.protectParam,(req, res)=>{
     res.status(200).json({ message: 'Passed middleware' })})

serverTest.post('/test/land', mid.landingCreate, (req, res) => {
    res.status(201).json({ message: 'Passed middleware' })})

serverTest.put('/test/land/:id', mid.landingUpdate, (req, res) => {
    res.status(200).json({ message: 'Passed middleware' })})

serverTest.use((err, req, res, next)=>{
    const status = err.status ||500
    const message = err.message || err.stack
    res.status(status).json(message)
})



export default serverTest;