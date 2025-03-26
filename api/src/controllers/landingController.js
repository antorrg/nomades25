import sv from "../services/landingService.js";
import sm from "../services/mailerService.js"
import eh from "../utils/errorHandlers.js";
import Utils from '../utils/utils.js'

export default {
  createLandingController: eh.catchAsync(async (req, res) => {
    const { title, image, info_header, description } = req.body;
    const response = await sv.createLanding(
      title,
      image,
      info_header,
      description
    );
    return Utils.responder(res, 201, true, 'Creacion exitosa', response)
  }),
  updLandingController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const response = await sv.updLanding(id, newData);
    return Utils.responder(res, 200, true, 'Actualizacion exitosa', response)
  }),
  deleteLandingController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await sv.delLanding(id);
    return Utils.responder(res, 200, true, 'Elemento borrado', response)
  }),
  getLandingController: eh.catchAsync(async (req, res) => {
    const admin = req.admin;
    const response = await sv.getOneLanding(admin);
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  detailLandingController: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await sv.getLandById(id);
    return Utils.responder(res, 200, true, 'Elemento hallado', response)
  }),
  emailLandingController : eh.catchAsync(async(req, res)=>{//Controlador de envio de emails
    const {email, issue, message}=req.body;
    const response = await sm.senderMail(email, issue, message)
    return Utils.responder(res, 200, true, null, response)
  })
};
