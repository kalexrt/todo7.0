import request from "supertest";
import express from "express";
import expect from "expect";
import taskRouter from "../../routes/task.routes";
import { STATUS } from "../../interfaces/status.interface";
import { ITask } from "../../interfaces/ITask.interface";
import config from "../../config";

const app = express();
app.use(express.json());
app.use("/tasks", taskRouter);

const token = config.testBearerToken;
const authHeader = { Authorization: token };

describe("Task Routes Integration Tests", () => {
  describe("GET /tasks", () => {
    it("should get all tasks for the authenticated user", async () => {
      const res = await request(app).get("/tasks").set(authHeader);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { id: 1, name: "walk the dog", status: STATUS.TODO, userId: 1 },
        { id: 2, name: "feed the cat", status: STATUS.TODO, userId: 1 },
      ]);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const newTask: ITask = {
        id: 4,
        name: "do homework",
        status: STATUS.TODO,
        userId: 1,
      };
      const res = await request(app)
        .post("/tasks")
        .set(authHeader)
        .send(newTask);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({message:"Task created"});
    });
  });

  describe("GET /tasks/:id", () => {
    it("should get a task by ID for the authenticated user", async () => {
      const res = await request(app).get("/tasks/1").set(authHeader);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: 1,
        name: "walk the dog",
        status: STATUS.TODO,
        userId: 1,
      });
    });

    it("should return 404 for getting a non-existent task", async () => {
      const res = await request(app).get("/tasks/999").set(authHeader);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update a task by ID for the authenticated user", async () => {
      const updatedTask: ITask = {
        id: 1,
        name: "walk the dog",
        status: STATUS.COMPLETE,
        userId: 1,
      };
      const res = await request(app)
        .put("/tasks/1")
        .set(authHeader)
        .send(updatedTask);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        "message": "Task Updated"
    });
    });

    it("should return 404 for updating a non-existent task", async () => {
      const updatedTask: ITask = {
        id: 999,
        name: "non-existent task",
        status: STATUS.TODO,
        userId: 1,
      };
      const res = await request(app)
        .put("/tasks/999")
        .set(authHeader)
        .send(updatedTask);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task by ID for the authenticated user", async () => {
      const res = await request(app).delete("/tasks/2").set(authHeader);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({message:"task deleted"})
    });

    it("should return 404 for deleting a non-existent task", async () => {
      const res = await request(app).delete("/tasks/999").set(authHeader);
      expect(res.statusCode).toBe(404);
    });
  });
});