import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth.interface";

import * as userService from "../service/user.service";
import { getUserQuery } from "../interfaces/user.interface";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

//get all users
export async function getUsers(
  req: Request<any, any, any, getUserQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called getUsers");
    const { query } = req;
    const data = await userService.getUsers(query);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(); // pass error to the error handling middleware
  }
}

//get user by id
export async function getUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    logger.info("Called getUserbyId");
    const data = await userService.getUserById(id);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(); // pass error to the error handling middleware
  }
}

//create a new user
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    logger.info("Called createUser");
    await userService.createUser(body, req.user.id!);
    res.status(HttpStatusCodes.OK).json({
      message: "User created",
    });
  } catch (error) {
    next();
  }
}

//update user by id
export async function updateUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    logger.info("Called updateUserById");
    const id = parseInt(req.params.id);
    const updatedUserData = req.body;
    const updatedUser = await userService.updateUserById(id, updatedUserData, req.user.id);
    res.status(HttpStatusCodes.OK).json({ message: "User updated" });
  } catch (error) {
    next();
  }
}

//delete user by id
export async function deleteUserById(req: Request<{ id: string }>, res: Response, next:NextFunction){
  try {
    const { id } = req.params; //extract the user ID
    res.status(HttpStatusCodes.OK).json(await userService.deleteUserById(parseInt(id))); //delete specific user
  } catch (error) {
    next();
  }
}
