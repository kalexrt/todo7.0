import {
  TaskModel,
} from "../model/task.model";
import { getTaskQuery, ITask } from "../interfaces/ITask.interface";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("TaskService");

//get tasks
export async function getTasks(userId: number, query: getTaskQuery) {
  logger.info("Called getTasks");
  const data = await TaskModel.getUserTasks(userId, query);

  if (!data) throw new NotFoundError("No tasks found");
  const count = await TaskModel.countByUserId(userId, query);
  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };
  return { data, meta };
}

//get task by id
export async function getTaskById(id: number, userId: number) {
  logger.info("Called getTaskById");

  const task = await TaskModel.getTaskById(id);
  if (!task) throw new NotFoundError("Task with this Id does not exist");

  const data = await TaskModel.getTaskById(id);
  return data;
}

//delete task
export async function deleteTaskById(id: number, userId: number) {
  logger.info("Called deleteTaskByid");

  const task = await TaskModel.getTaskById(id);
  if (!task) throw new NotFoundError("Task with this Id does not exist");
  if (+task.created_by !== userId) {
    throw new NotFoundError("Task with this Id does not exist");
  }
  await TaskModel.delete(id);
  return {
    message: "task deleted",
  };
}

//create task
export async function createTask(task: ITask, userId: number) {
  logger.info("Called createTask");
  const taskWithUserId = { ...task, userId }; //add userId to the task
  await TaskModel.create(taskWithUserId);

  return {
    message: "task created",
  };
}

//update task
export async function updateTaskById(id: number, task: ITask, userId: number) {
  logger.info("Called updateTaskById");

  const taskCheck = await TaskModel.getTaskById(id);
  if (!taskCheck) throw new NotFoundError("Task with this Id does not exist");
  if (+taskCheck.created_by !== userId)
    throw new NotFoundError("Task with this Id does not exist");

  await TaskModel.update(id, task);
  return {
    message: "task updated",
  };
}
