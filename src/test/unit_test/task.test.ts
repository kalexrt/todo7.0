import sinon from "sinon";
import expect from "expect";
import {
  getTasks,
  getTaskById,
  deleteTaskById,
  createTask,
  updateTaskById,
} from "../../service/task.service";
import * as taskModel from "../../model/task.model";
import { ITask } from "../../interfaces/ITask.interface";
import { STATUS } from "../../interfaces/status.interface";
import { NotFoundError } from "../../error/NotFoundError";

describe("Task Service Test Suite", () => {
  describe("getTasks", () => {
    let taskModelGetTasksFromDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelGetTasksFromDBStub = sinon.stub(taskModel, "getTasksFromDB");
    });

    afterEach(() => {
      taskModelGetTasksFromDBStub.restore();
    });

    it("Should return tasks for the user", () => {
      const tasks: ITask[] = [
        {
          id: 1,
          name: "Test Task",
          status: STATUS.ONGOING,
          userId: 1,
        },
      ];

      taskModelGetTasksFromDBStub.returns(tasks);

      const response = getTasks(1);

      expect(response).toStrictEqual(tasks);
    });
  });

  describe("getTaskById", () => {
    let taskModelFindTaskStub: sinon.SinonStub;
    let taskModelGetTaskByIdFromDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelFindTaskStub = sinon.stub(taskModel, "findTask");
      taskModelGetTaskByIdFromDBStub = sinon.stub(taskModel, "getTaskByIdFromDB");
    });

    afterEach(() => {
      taskModelFindTaskStub.restore();
      taskModelGetTaskByIdFromDBStub.restore();
    });

    it("Should return task by id for the user", () => {
      const task: ITask = {
        id: 1,
        name: "Test Task",
        status: STATUS.ONGOING,
        userId: 1,
      };

      taskModelFindTaskStub.returns(0);
      taskModelGetTaskByIdFromDBStub.returns(task);

      const response = getTaskById(1, 1);

      expect(response).toStrictEqual(task);
    });

    it("Should throw NotFoundError if task not found", () => {
      taskModelFindTaskStub.returns(-1);

      expect(() => getTaskById(1, 1)).toThrow(NotFoundError);
    });
  });

  describe("deleteTaskById", () => {
    let taskModelFindTaskStub: sinon.SinonStub;
    let taskModelDeleteTaskByIdFromDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelFindTaskStub = sinon.stub(taskModel, "findTask");
      taskModelDeleteTaskByIdFromDBStub = sinon.stub(taskModel, "deleteTaskByIdFromDB");
    });

    afterEach(() => {
      taskModelFindTaskStub.restore();
      taskModelDeleteTaskByIdFromDBStub.restore();
    });

    it("Should delete task by id for the user", () => {
      taskModelFindTaskStub.returns(0);
      taskModelDeleteTaskByIdFromDBStub.returns({ message: "task deleted" });

      const response = deleteTaskById(1, 1);

      expect(taskModelDeleteTaskByIdFromDBStub.callCount).toBe(1);
      expect(taskModelDeleteTaskByIdFromDBStub.getCall(0).args).toStrictEqual([0]);
      expect(response).toStrictEqual({ message: "task deleted" });
    });

    it("Should throw NotFoundError if task not found", () => {
      taskModelFindTaskStub.returns(-1);

      expect(() => deleteTaskById(1, 1)).toThrow(NotFoundError);
    });
  });

  describe("createTask", () => {
    let taskModelCreateTaskInDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelCreateTaskInDBStub = sinon.stub(taskModel, "createTaskInDB");
    });

    afterEach(() => {
      taskModelCreateTaskInDBStub.restore();
    });

    it("Should create a new task for the user", () => {
      const task: ITask = {
        id: 1,
        name: "Test Task",
        status: STATUS.TODO,
        userId: 1,
      };

      const userId = 1;
      const taskWithUserId = { ...task, userId };

      taskModelCreateTaskInDBStub.returns({ message: "task created" });

      const response = createTask(task, userId);

      expect(taskModelCreateTaskInDBStub.callCount).toBe(1);
      expect(taskModelCreateTaskInDBStub.getCall(0).args).toStrictEqual([taskWithUserId]);
      expect(response).toStrictEqual({ message: "task created" });
    });
  });

  describe("updateTaskById", () => {
    let taskModelFindTaskStub: sinon.SinonStub;
    let taskModelUpdateTaskInDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelFindTaskStub = sinon.stub(taskModel, "findTask");
      taskModelUpdateTaskInDBStub = sinon.stub(taskModel, "updateTaskInDB");
    });

    afterEach(() => {
      taskModelFindTaskStub.restore();
      taskModelUpdateTaskInDBStub.restore();
    });

    it("Should update task by id for the user", () => {
      const task: ITask = {
        id: 1,
        name: "Updated Task",
        status: STATUS.COMPLETE,
        userId: 1,
      };

      taskModelFindTaskStub.returns(0);
      taskModelUpdateTaskInDBStub.returns({ message: "task updated" });

      const response = updateTaskById(1, task, 1);

      expect(taskModelFindTaskStub.callCount).toBe(1);
      expect(taskModelFindTaskStub.getCall(0).args).toStrictEqual([1, 1]);
      expect(taskModelUpdateTaskInDBStub.callCount).toBe(1);
      expect(taskModelUpdateTaskInDBStub.getCall(0).args).toStrictEqual([0, task]);
      expect(response).toStrictEqual({ message: "task updated" });
    });

    it("Should throw NotFoundError if task not found", () => {
      taskModelFindTaskStub.returns(-1);

      const task: ITask = {
        id: 1,
        name: "Updated Task",
        status: STATUS.COMPLETE,
        userId: 1,
      };

      expect(() => updateTaskById(1, task, 1)).toThrow(NotFoundError);
    });
  });
});