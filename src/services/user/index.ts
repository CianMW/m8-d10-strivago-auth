import express from "express";
import createHttpError from "http-errors";
import { jwtAuth } from "../../tools";
import { UserModel } from "./schema";

const usersRouter = express.Router();

usersRouter
.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.checkCredentials(email, password);
      if (user) {
        const token = jwtAuth(user);
        if (!token) {
          next(createHttpError(403));
        } else {
          res.status(200).send({ token });
        }
      } else {
        next(createHttpError(404, "User credentials error"));
      }
    } catch (error) {
      next(error);
    }
  })
  .post("/", async (req, res) => {
    try {
        const newDestination = new UserModel(req.body)
        await newDestination.save()
        res.send(201).send(newDestination)
    } catch {
        res.status(400).send()
    }
  })
  .get("/:city", async (req, res) => {
    const city = req.params.city
    console.log("city : ", city)
    const destination = await UserModel.find({city : city});
    console.log("destinations: ",destination)
    try {
        if (destination) {
          res.status(200).send(destination);
        } 
    } catch(error) {
        res.status(404).send(error);
    }
  });

export default usersRouter;
