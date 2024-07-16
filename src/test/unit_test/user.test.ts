import sinon from "sinon";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
} from "../../service/user.service";
import expect from "expect";
import bcrypt from "bcrypt";
import * as userModel from "../../model/user.model";
import * as taskModel from "../../model/task.model";
import { BadRequestError } from "../../error/BadRequestError";

describe("User Service Test Suite", () => {
  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(userModel, "getUserById");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("Should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => getUserById(100)).toThrow(
        new BadRequestError("User with this Id does not exist")
      );
    });

    it("Should return user id user is found", () => {
      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByIdStub.returns(user);

      const response = getUserById(1);

      expect(response).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelCreateUserStub = sinon.stub(userModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelCreateUserStub.restore();
    });

    it("Should create a new user", async () => {
      bcryptHashStub.resolves("hashedPassword");

      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelCreateUserStub.callCount).toBe(1);
      expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });
  describe("getUsers", () => {
    let userModelGetUsersStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUsersStub = sinon.stub(userModel, "getUsers");
    });

    afterEach(() => {
      userModelGetUsersStub.restore();
    });

    it("Should return users based on query", () => {
      const users = [
        {
          id: "1",
          name: "Test",
          email: "test@test.com",
          password: "test1234",
          permissions: [],
        },
      ];

      const query = { q: "Test" };

      userModelGetUsersStub.returns(users);

      const response = getUsers(query);

      expect(response).toStrictEqual(users);
    });
  });

  describe("getUserByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(userModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });

    it("Should throw error when user is not found by email", () => {
      userModelGetUserByEmailStub.returns(undefined);

      expect(() => getUserByEmail("test@test.com")).toThrow(
        new BadRequestError("User with this email does not exist")
      );
    });

    it("Should return user if user is found by email", () => {
      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByEmailStub.returns(user);

      const response = getUserByEmail("test@test.com");

      expect(response).toStrictEqual(user);
    });
  });

  describe("deleteUserById", () => {
    let taskModelDeleteAllTasksByUserIdStub: sinon.SinonStub;
    let userModelDeleteUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelDeleteAllTasksByUserIdStub = sinon.stub(
        taskModel,
        "deleteAllTasksByUserId"
      );
      userModelDeleteUserByIdStub = sinon.stub(userModel, "deleteUserById");
    });

    afterEach(() => {
      taskModelDeleteAllTasksByUserIdStub.restore();
      userModelDeleteUserByIdStub.restore();
    });

    it("Should throw error if user deletion fails", () => {
      taskModelDeleteAllTasksByUserIdStub.returns(true);
      userModelDeleteUserByIdStub.returns(false);

      expect(() => deleteUserById(1)).toThrow(
        new BadRequestError("user task does not exist")
      );
    });

    it("Should delete user and their tasks if user is found", () => {
      const taskDeletionResult = true;
      const userDeletionResult = true;

      taskModelDeleteAllTasksByUserIdStub.returns(taskDeletionResult);
      userModelDeleteUserByIdStub.returns(userDeletionResult);

      const response = deleteUserById(1);

      expect(response).toStrictEqual({
        taskDeletionResult,
        userDeletionResult,
      });
    });
  });

  describe("updateUserById", () => {
    let userModelUpdateUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelUpdateUserByIdStub = sinon.stub(userModel, "updateUserById");
    });

    afterEach(() => {
      userModelUpdateUserByIdStub.restore();
    });

    it("Should throw error if user update fails", () => {
      userModelUpdateUserByIdStub.returns(undefined);

      expect(() => updateUserById(1, { name: "Updated Name" })).toThrow(
        new BadRequestError("task doesnot exist")
      );
    });

    it("Should update user if user is found", () => {
      const updatedUser = {
        id: "1",
        name: "Updated Name",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      userModelUpdateUserByIdStub.returns(updatedUser);

      const response = updateUserById(1, { name: "Updated Name" });

      expect(response).toStrictEqual(updatedUser);
    });
  });
});
