import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import env from './envConfig.js'
import { configureCloudinary } from "./utils/cloudinary.js";
import sm from "./middlewares/serverMiddlewares.js";
import mainRouter from './routes/mainRouter.js'
import {fileURLToPath} from 'url'
import path from 'path'



//const dirname = path.dirname(fileURLToPath(import.meta.url))
const dirname = path.resolve()


const server = express();
configureCloudinary({
    cloud_name:env.CloudName,
    api_key:env.CloudApiKey,
    api_secret: env.CloudApiSecret
});
server.use(morgan("dev"));
server.use(cors());
server.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [
            "'self'",
            "https://res.cloudinary.com",
            "https://www.youtube.com",
            "https://www.instagram.com",
            "https://www.facebook.com",
          ],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://example.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://example.com"],
          imgSrc: [
            "'self'",
            "data:",
            "https://res.cloudinary.com", // Permite Cloudinary
          ],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", "data:", "https://res.cloudinary.com"],
          objectSrc: ["'none'"], // Desactiva objetos (Flash, etc.)
          upgradeInsecureRequests: [], // Fuerza HTTPS
        },
      },
    })
  );

server.use(express.json());
server.use(sm.validJson);
server.use(express.static(path.join(dirname, 'dist')))

server.use(mainRouter)


if(env.Status === 'production'){
server.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'dist', 'index.html'));
  })};

server.use(sm.lostRoute);
server.use(sm.errorEndWare);



export default server;
