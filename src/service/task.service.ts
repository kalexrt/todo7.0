import {
  createTaskInDB,
  deleteTaskByIdFromDB,
  getTaskByIdFromDB,
  getTasksFromDB,
  updateTaskInDB,
  findTask,
} from "../model/task.model";
import { ITask } from "../interfaces/ITask.interface";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("TaskService")

//get tasks
export function getTasks(userId: number) {
  logger.info("Called getTasks")
  return getTasksFromDB(userId);
}

//get task by id
export function getTaskById(id: number, userId: number) {
  logger.info("Called getTaskById")
  const index = findTask(id, userId);
  if(index === -1) throw new NotFoundError("Not found");
  const data = getTaskByIdFromDB(index)
  return data
}

//delete task
export function deleteTaskById(id: number, userId: number) {
  logger.info("Called deleteTaskByid")
  const index = findTask(id, userId);
  if(index === -1) throw new NotFoundError("Not found");
  const data = deleteTaskByIdFromDB(index)
  return data
}

//create task
export function createTask(task: ITask, userId: number) {
  logger.info("Called createTask")
  const taskWithUserId = { ...task, userId }; //add userId to the task
  return createTaskInDB(taskWithUserId);
}

//update task
export function updateTaskById(id: number, task: ITask, userId: number) {
  logger.info("Called updateTaskById");
  const index = findTask(id, userId);
  if(index === -1) throw new NotFoundError("Not found");
  const data = updateTaskInDB(index, task);
  return data;
}
