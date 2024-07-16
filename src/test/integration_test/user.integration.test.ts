import request from "supertest";
import express from "express";
import router from "../../routes/index.routes";
import config from "../../config";
import expect from "expect";
import { genericErrorHandler, routeNotFoundError } from "../../middlewares/errorHandler.middleware";

describe("User Integration Test Suite", () => {
  const app = express();
  const token = config.testBearerToken;
  app.use(express.json());

  app.use(router);
  app.use(genericErrorHandler);
  app.use(routeNotFoundError);

  //ccreate user request
  describe("createUser API test", () => {
    it("Should create a new user", async ()=>{
        const response = await request(app)
        .post("/users")
        .set("Authorization", token)
        .send({
            id: "4",
            name: "User integration Test",
            email: "user1@test.com",
            password: "Test1234!",
            permissions:[],
        });
        expect(response.body).toHaveProperty("message", "User created");
    })
  });

  //get user by Id
  describe("getUserById API test", () => {
    it("Should return user by id", async () => {
      const userId = "1";

      const response = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", token)

      expect(response.body).toHaveProperty("id", "1");
      expect(response.body).toHaveProperty("name", "Kalash");
      expect(response.body).toHaveProperty("email", "kalash1@gmail.com");
    });

    it("Should return error when user is not found", async () => {
      const userId = "999";

      const response = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", token)

      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toHaveProperty("message", "Not Found");
    });
  });

  //get users
  describe("getUsers API test", () => {
    it("Should return users based on query", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", token)
        .query({ q: "Kalash" });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("Should return empty array when no users match query", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", token)
        .query({ q: "NonExistingUser" });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });
  });

  //update users
  describe("updateUserById API test", () => {
    it("Should update user by id", async () => {
      const userId = "1";
      const response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", token)
        .send({
          id: userId,
          name: "Updated Kalash",
          email: "kalash1@gmail.com",
          password: "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
          permissions:["users.getAll","users.create","users.getById","users.updateById","users.deleteById"],
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "User updated");
    });

    it("Should return error when updating non-existing user", async () => {
      const userId = "999";
      const response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", token)
        .send({
          id: "2",
          name: "khaaaa",
          email: "kalash3@gmail.com",
          password: "kalasH123.!",
          permissions:[]
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Not Found");
    });
  });

  //delete request
  describe("deleteUserById API test", () => {
    it("Should delete user by id", async () => {
      const userId = "2";
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", token);

      expect(response.status).toBe(200);
      expect(response.body.userDeletionResult).toHaveProperty("message", `user deleted`);
    });

    it("Should return error when deleting non-existing user", async () => {
      const userId = "999";
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", token);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Not Found");
    });
  });
});
