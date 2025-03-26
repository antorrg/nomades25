import env from '../envConfig.js'
import eh from '../utils/errorHandlers.js'
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
//import { body, query,validationResult } from 'express-validator';

export default {
createUser : async (req, res, next)=>{
    const{email}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){eh.throwError('Falta el email', 400)};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {eh.throwError('Formato de email invalido', 400)}
    next()
},
loginUser : async (req, res, next)=>{
        const{email, password}= req.body;
        // Validar si existe el email y su formato usando una expresión regular
        if(!email){eh.throwError('Falta el email', 400)};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {eh.throwError('Formato de email invalido', 400)}
        if(!password){eh.throwError('Falta la contraseña!', 400)};
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
        if (!passwordRegex.test(password)) {eh.throwError('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula',400)}
        next()
},

userVerifyPassMidd : (req, res, next) => {
    const { id , password}= req.body
    const {userId}=req.userInfo
    //Validar que el id y el userId (token) sean iguales.
    if(id !== userId){eh.throwError('Solo el propietario de la cuenta puede cambiar la contraseña!!',400)}
    if(!password){eh.throwError('Falta la contraseña!', 400)};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {eh.throwError('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula',400)}
    next();
},
userChangePassMidd : (req, res, next) => {
    const { id } = req.params; 
    const {password}= req.body
    const {userId}=req.userInfo
  
    //Validar que el id y el userId (token) sean iguales.
    if(id !== userId){eh.throwError('Solo el propietario de la cuenta puede cambiar la contraseña!!',400)}
    if(!password){eh.throwError('Falta la contraseña!', 400)};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {eh.throwError('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula',400)}
    next();
},

}