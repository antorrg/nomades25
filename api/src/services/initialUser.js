import { User } from "../db.js";
import env from "../envConfig.js";
import serv from "./userServices.js";

const initialUser = async () => {
  const email = env.UserEmail;
  const password = env.UserPass;
  const role = 9;
  try {
    const users = await User.findAll();
    if (users.length > 0) {
      return console.log("The user already exists!");
    }
    const superUser = await serv.userCreate(email, password, role);
    if (!superUser) {
      const error = error;
      error.status = 500;
      throw error;
    }
    return console.log("The user was successfully created!!");
  } catch (error) {
    console.error("Algo ocurrió al inicio: ", error);
  }
};
export default initialUser;

