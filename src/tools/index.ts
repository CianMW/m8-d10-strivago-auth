import jwt from "jsonwebtoken";
import { IUserModel } from "../interfaces/IUserModel";
process.env.TS_NODE_ENV && require("dotenv").config() 


type payload = {
    _id: string
}


export const jwtAuth = async (user: IUserModel) => {
  const token = await generateJWTToken({ _id: user._id });
  return token;
};

const generateJWTToken = (payload : payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.AUTH_ACCESS_SECRET!,
      { expiresIn: "30m" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
