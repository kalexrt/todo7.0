import { ITask } from "../interfaces/ITask.interface";
import { STATUS } from "../interfaces/status.interface";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskModel")

export let db: ITask[] = [
  {
    id: 1,
    name: "walk the dog",
    status: STATUS.TODO,
    userId: 1,
  },
  {
    id: 2,
    name: "feed the cat",
    status: STATUS.TODO,
    userId: 1,
  },
  {
    id: 1,
    name: "assignment 1",
    status: STATUS.TODO,
    userId: 2,
  },
];

//find task
export function findTask(searchId: number, userId: number) {
  logger.info("Called FindTask")
  const index = db.findIndex((task) => task.id === searchId && task.userId === userId) 
  return index
}

//get all tasks
export function getTasksFromDB(userId: number) {
  logger.info("Called getTasksFromDB")
  const data = db.filter((task) => task.userId === userId);
  return data
}

//get task from id
export function getTaskByIdFromDB(index: number) {
  logger.info("Called getTaskByIdFromDB")
  const data = db[index];
  return data
}

//delete task
export function deleteTaskByIdFromDB(index: number) {
  logger.info("Called deleteTaskByIdFromDB")
  db.splice(index, 1); //remove task
  return {message:"task deleted"}
}

//create task
export function createTaskInDB(task: ITask) {
  logger.info("Called createTaskInDB")
  db.push(task);
  return {message:"task created"}
}

//update task
export function updateTaskInDB(
  index: number,
  updatedTask: ITask,
) {
  logger.info("Called updateTaskInDB")
  db[index] = updatedTask; //update task
  return {message: "task updated"}
}

//delete all tasks by user id
export function deleteAllTasksByUserId(userId: number) {
  logger.info("Called deleteAlltasksByUserId")
  const initialLength = db.length;
  db = db.filter((task) => task.userId !== userId);
  const deletedCount = initialLength - db.length; //find number of delted tasks
  return { message: `${deletedCount} task(s) deleted for user ID ${userId}` }; //return message
}
