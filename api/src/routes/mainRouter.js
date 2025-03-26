import express from "express";
import mediaRouter from "./mediaRouter.js";
import productRouter from "./productRouterRest.js";
import userRouter from "./userRouterRest.js";
import landingRouter from "./landingRouter.js";
import aboutRouter from "./aboutRouter.js";
import { upload, controllerUploader } from "../utils/cloudinary.js";
import auth from "../middlewares/validation/sessionMiddle.js";

const mainRouter = express.Router();
//mainRouter.use(mid.sanitizeBody);
//mainRouter.use(mid.sanitizeQuery);

mainRouter.post("/api/v1/imgupload", auth.verifyToken , upload.single("image"),controllerUploader); //Ruta de subida de imagenes


mainRouter.use("/api/v1", productRouter);

mainRouter.use("/api/v1", landingRouter);

mainRouter.use("/api/v1", userRouter);

mainRouter.use("/api/v1", mediaRouter);

mainRouter.use("/api/v1", aboutRouter)

//mainRouter.use(mid.lostRoute)

export default mainRouter;
