import bcrypt, { hash } from "bcrypt";
import { getUserQuery, User } from "../interfaces/user.interface";
import * as taskModel from "../model/task.model";
import * as userModel from "../model/user.model";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("UserService");

// get a user by their ID
export async function getUserById(id: string) {
  logger.info("Called getUserById");

  const user = await userModel.UserModel.getUserById(id.toString());
  if (!user) throw new NotFoundError("User with this Id does not exist");

  const data = await userModel.UserModel.getUserById(id);
  return {data};
}

// create a new user with a hashed password
export async function createUser(user: User, id: string) {
  logger.info("Called createUser");
  const createdBy = id;
  const password = await bcrypt.hash(user.password, 10);

  userModel.UserModel.create(
    {
      ...user,
      password,
    },
    createdBy
  );
}

// Get all users
export const getUsers = async (query: getUserQuery) => {
  const data = await userModel.UserModel.getUsers(query);
  if (!data) throw new NotFoundError("No users found");
  const count = await userModel.UserModel.count(query);
  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };
  return { data, meta };
};

// get a user by their email
export async function getUserByEmail(email: string) {
  logger.info("Called getUserByEmail");
  const data = await userModel.UserModel.getByEmail(email);
  if (!data) {
    throw new NotFoundError("User with this email does not exist");
  }
  return data;
}

// delete a user by their ID, including all their tasks
export async function deleteUserById(id: number) {
  logger.info("Called deleteUserById");

  const user = await userModel.UserModel.getUserById(id.toString());
  if (!user) throw new NotFoundError("User with this Id does not exist");

  await userModel.UserModel.deleteUserById(id.toString());
  return {
    message: "user deleted",
  };
}

// update user information by their ID
export async function updateUserById(
  id: number,
  updatedUserData: User,
  updatedBy: string
) {
  logger.info("Called updateUserById");

  const user = await userModel.UserModel.getUserById(id.toString());
  if (!user) throw new NotFoundError("User with this Id does not exist");

  const password = await bcrypt.hash(updatedUserData.password, 10);

  userModel.UserModel.update(
    id.toString(),
    { ...updatedUserData, password },
    updatedBy
  );
  return {
    message: "user updated",
  };
}
