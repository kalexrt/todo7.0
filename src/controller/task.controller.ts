import * as taskService from "../service/task.service";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskController")

//get all tasks
export function getAllTasks(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Called getAllTasks");
    const user =  req.user!; //extract user
    const tasks = taskService.getTasks(parseInt(user.id)); //get all tasks from the services
    res.status(HttpStatusCodes.OK).json(tasks);
  } catch(error){
    next();
  }
}

//get task by id
export function getTaskById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    logger.info("Called getTaskById");
    const user =  req.user!; //extract user
    const { id } = req.params;   //extract the task ID
    const task = taskService.getTaskById(parseInt(id), parseInt(user.id)); //get specific task
    res.json(task);
  } catch (error) {
    next();
  }
}

//delete task by id
export function deleteTaskById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    logger.info("Called deleteTaskById")
    const user =  req.user!; //extract user
    const { id } = req.params; //extract the task ID
    res.status(HttpStatusCodes.OK).json(taskService.deleteTaskById(parseInt(id), parseInt(user.id))); //delete specific task
  } catch (error) {
    next();
  }
}

//create new task
export function createTask(req: Request, res: Response, next: NextFunction) {
  try{
    logger.info("Called createTask");
    const { body } = req; //extract the body in json
    const userId =  req.user?.id!; //extract user
    taskService.createTask(body, parseInt(userId)); //create the task
    res.status(HttpStatusCodes.OK).json({ message: "Task created" });
  } catch(error){
    next();
  }
}

//update specific task
export function updateTaskById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    logger.info("Called updateTaskById");
    const user =  req.user!; //extract user
    const  id  = parseInt(req.params.id); //extract the task ID
    const { body } = req; //extract the body in json
    taskService.updateTaskById(id, body, parseInt(user.id)); //make changes to the task
    res.status(HttpStatusCodes.OK).json({ message: "Task Updated" });
  } catch (error) {
    next();
  }
}

