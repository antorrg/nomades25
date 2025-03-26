import eh from "../utils/errorHandlers.js";
import sv from "../services/userServices.js";
import Utils from '../utils/utils.js'
import * as vld from "../middlewares/validation/sessionMiddle.js";

export default {
  userCreateController: eh.catchAsync(async (req, res) => {
    const { email } = req.body;
    const response = await sv.userCreate(email);
    return Utils.responder(res, 201, true, 'Usuario creado exitosamente', response)
  }),
  loginController: eh.catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const response = await sv.userLog(email, password);
    return Utils.responder(res, 200, true, 'Usuario autenticado', response)
  }),
  logout: eh.catchAsync(async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid"); // Limpia la cookie de sesión del cliente
      res.clearCookie("connect.id");
      res.clearCookie("sessionId");
      return Utils.responder(res, 200, true, 'Sesion cerrada', null)
    });
  }),

  updUserCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const response = await sv.userUpd(id, newData);
    return Utils.responder(res, 200, true, 'Usuario actualizado', response)
  }),

  changePassCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const response = await sv.userChangePass(id, password);
    return Utils.responder(res, 200, true, response, null)
  }),
  resetPassCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.body;
    const response = await sv.userResetPass(id);
    return Utils.responder(res, 200, true, response, null)
  }),

  verifyPassCtr: eh.catchAsync(async (req, res) => {
    const { id, password } = req.body;
    const response = await sv.verifyPass(id, password);
    return Utils.responder(res, 200, true, response, null)
  }),
  changeStateUserCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const response = await sv.userUpgrade(id, newData);
    return Utils.responder(res, 200, true, response, null)
  }),
  delUserCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await sv.userDel(id);
    return Utils.responder(res, 200, true, response.message, response.results)
  }),
  getUserController: eh.catchAsync(async (req, res) => {
    //provisiorio
    const response = await sv.getAllUsers();
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  getUserByIdController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await sv.getUsersById(id);
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
};
