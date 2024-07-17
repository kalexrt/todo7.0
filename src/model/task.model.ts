import { getTaskQuery, ITask } from "../interfaces/ITask.interface";
import { STATUS } from "../interfaces/status.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base";

const logger = loggerWithNameSpace("TaskModel");

export class TaskModel extends BaseModel {
  //create tasks
  static async create(task: ITask) {
    logger.info("Called createTaskInDB");
    const taskToCreate = {
      id: task.id,
      name: task.name,
      status_id: this.statusToStatusId(task.status),
      created_by: task.userId,
      user_id: task.userId,
    };
    await this.queryBuilder().insert(taskToCreate).table("tasks");
  }

  //get status id from status
  static statusToStatusId(status: STATUS) {
    switch (status) {
      case STATUS.COMPLETE:
        return 1;
      case STATUS.ONGOING:
        return 2;
      case STATUS.TODO:
        return 3;
    }
  }

  //delete task
  static async delete(id: number) {
    logger.info("Called delete Task");
    return await this.queryBuilder().delete().from("tasks").where({ id });
  }

  //get task by id
  static async getTaskById(id: number) {
    return await this.queryBuilder()
      .select("*")
      .from("tasks")
      .where({ id })
      .first();
  }

  //update task
  static async update(id: number, task: ITask) {
    const taskToUpdate = {
      name: task.name,
      status_id: this.statusToStatusId(task.status),
      updated_at: new Date(),
      updated_by: task.userId,
    };
    await this.queryBuilder().update(taskToUpdate).table("tasks").where({ id });
  }

  static async getUserTasks(user_id: number, filter: getTaskQuery) {
    const { q, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "name", "status_id")
      .table("tasks")
      .where({ user_id })
      .limit(size)
      .offset((page - 1) * size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  static countByUserId(user_id: number, filter: getTaskQuery) {
    const { q } = filter;
    const query = this.queryBuilder()
      .count("*")
      .from("tasks")
      .where({ user_id })
      .first()
    
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}