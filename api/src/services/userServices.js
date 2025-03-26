import { User } from "../db.js";
import eh from '../utils/errorHandlers.js'
import { oldImagesHandler } from "./storage.js";
import bcrypt from "bcrypt";
import jwt from '../middlewares/validation/sessionMiddle.js'
import env from "../envConfig.js";
import help from "./helpers.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // TTL (Time To Live) de una hora

export default {
  userCreate: async (email1, password1, role1) => {
    const finalPassword = password1? password1 : env.defaultPass
    try {
      const userFound = await User.findOne({
        where: {
          email: email1,
        },});
      if (userFound) {eh.throwError('Este usuario ya existe', 400)}
      //preparacion de variables:
      const hashedPassword = await bcrypt.hash(finalPassword, 12);
      const nickname1 = email1.split("@")[0];

      const newUser = await User.create({
        email: email1,
        password:  hashedPassword,
        nickname: nickname1,
        given_name: "",
        role: role1 || 1,
        picture: `${env.userImg}`,
      });
      if (!newUser) {eh.throwError('Error inesperado en el servidor', 500)}
      return help.userParser(newUser, true, true);
    } catch (error) {throw error;}
  },

  userLog: async (email1, password1) => {
    try {
      const user = await User.findOne({
        where: {
          email: email1,
        },
      });
      if (!user || user === undefined) {eh.throwError('Este usuario no existe', 404)}
      if(user.enable===false){eh.throwError('Usuario bloqueado!', 403)}
      //verificacion de password:
      const passwordMatch = await bcrypt.compare(password1, user.password);
      if (!passwordMatch) {eh.throwError('Contraseña no valida', 400)}
      //formacion del token y retorno del usuario.

      return {user: help.userParser(user, true, true),
              token: jwt.generateToken(user)
             }
    } catch (error) {throw error;}
  },

  getAllUsers: async () => {
    try {
      const userFound = await User.findAll();
      if (!userFound) {eh.throwError('Error inesperado. Usuario no hallado', 500)}
      if (userFound.length === 0) {return help.emptyUser()}
      return help.userParser(userFound, false, true);
    } catch (error) { throw error;}
  },

  getUsersById: async (id) => {
     // Intento obtener los datos del caché
    //  let cachedUser = cache.get(`userById_${id}`);
    //  if (cachedUser) {
    //    return cachedUser;
    //  }
    try {
      const userFound = await User.findByPk(id);
      if (!userFound) {eh.throwError('Usuario no hallado', 404)}
      const userDetail =  help.userParser(userFound, true, true);
      //cache.set(`userById_${id}`, userDetail);
      return userDetail;
    } catch (error) {
      throw error;
    }
  },

  userUpd: async (id, newData) => {
    //let imageStore = "";
    const options = help.optionImage(newData.saver)
    try {
      const user = await User.findByPk(id);
      if (!user) {eh.throwError('Usuario no hallado', 404)}
      const edit = help.protectProtocol(user) // Proteger al superusuario contra edicion
      const nickname1 =  newData.email.split("@")[0];
      //Verifica si se esta actualizando la imagen
      // if (newData.picture !== user.picture) {
      //         imageStore = user.picture}
      const updInfo = {
        email: edit? user.email : newData.email,
        nickname: edit? user.nickname : nickname1,
        given_name: newData.given_name,
        picture: newData.picture,
        country: newData.country,
      };
      const userUpdated = await user.update(updInfo);
      //const pictureOld = await oldImagesHandler(imageStore, options)
      //if(pictureOld.success===false){eh.throwError('Error al procesar imagen antigua', 500)}
      //       if (userUpdated) {
      //    cache.del(`userById_${id}`);
      //  }
     
      return help.userParser(userUpdated, true, true);
    } catch (error) { throw error; }
  },

  verifyPass: async (id, password) => {
    try {
      const user = await User.findByPk(id);
      if (!user) { eh.throwError('Usuario no hallado', 404)}
      const edit = help.protectProtocol(user) // Proteger al superusuario contra edicion
      if(edit){eh.throwError('No se puede cambiar la contraseña a este usuario. Accion no permitida', 403)}
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) { eh.throwError('Contraseña incorrecta!', 400)}
      return "Contraseña verificada exitosamente" ;
    } catch (error) { throw error; }
  },

  userChangePass: async (id, password) => {
    try {
      const user = await User.findByPk(id);
      if (!user) { eh.throwError('Usuario no hallado', 404)}
      const edit = help.protectProtocol(user) // Proteger al superusuario contra edicion
      if(edit){eh.throwError('No se puede cambiar la contraseña a este usuario. Accion no permitida', 403)}
      const hashedPassword = await bcrypt.hash(password, 12);
      const newData = { password: hashedPassword };
      const newUser = await user.update(newData);
      //if (newUser) {cache.del(`userById_${id}`)}
      return "Contraseña actualizada exitosamente";
    } catch (error) { throw error; }
  },
  userResetPass: async (id) => {
    console.log('soy el id:', id)
    const password = `${env.defaultPass}`
    try {
      const user = await User.findByPk(id);
      if (!user) { eh.throwError('Usuario no hallado', 404)}
      const edit = help.protectProtocol(user) // Proteger al superusuario contra edicion
      if(edit){eh.throwError('No se puede cambiar la contraseña a este usuario. Accion no permitida', 403)}
      const hashedPassword = await bcrypt.hash(password, 12);
      const newData = { password: hashedPassword };
      const newUser = await user.update(newData);
      if (newUser) //{cache.del(`userById_${id}`)}
      return "Contraseña reiniciada exitosamente";
    } catch (error) { throw error; }
  },
  userUpgrade: async (id, newData) => {
    const parseEnable = (value)=>{
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
      }
      return Boolean(value);
    }
    try {
      const user = await User.findByPk(id);
      if (!user) {eh.throwError('Usuario no hallado', 404)}
      const edit = help.protectProtocol(user) // Proteger al superusuario contra edicion
      const newRole = help.revertScope(newData.role)
      const updInfo = {
        role: edit? Number(user.role) : Number(newRole),
        enable: edit? true : parseEnable(newData.enable),
      };
      const userUpdated = await user.update(updInfo);
      if (userUpdated) {
        //cache.del(`userById_${id}`);
      }
      return help.userParser(userUpdated, true, true);
    } catch (error) { throw error; }
  },

  userDel: async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) { eh.throwError('Usuario no hallado', 404)}
      let response = user.nickname
      const edit = help.protectProtocol(user) // Proteger al superusuario contra edicion
      if(edit){eh.throwError('No se puede eliminar a este usuario', 403)}
      await user.destroy(id);
      //cache.del(`userById_${id}`)
      return { message: "Usuario borrado exitosamente" , results: response};
    } catch (error) { throw error;}
  },
};
