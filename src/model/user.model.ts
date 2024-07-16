import { getUserQuery, User } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base";

const logger = loggerWithNameSpace("UserModel");

export class UserModel extends BaseModel {
  static async create(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email, 
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).table("users");
  }
  static async update(id:string, user: User) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
    };

    await this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({id});
  }
}

export let users: User[] = [
  {
    id: "1",
    name: "Kalash",
    email: "kalash1@gmail.com",
    password: "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
    permissions: [
      "users.getAll",
      "users.create",
      "users.getById",
      "users.updateById",
      "users.deleteById",
    ],
  },
  {
    id: "2",
    name: "Kalash",
    email: "kalash2@gmail.com",
    password: "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
    permissions: [],
  },
];

//find user index
export function findUserIndex(id: number) {
  logger.info("Called FindTask");
  const index = users.findIndex((users) => +users.id === id);
  return index;
}

//return user by id
export function getUserByIndex(index: number) {
  logger.info("Called getUserById");
  return users[index];
}

//create users
export function createUser(user: User) {
  logger.info("Called createUser");
  users.push({
    ...user,
    id: `${users[users.length - 1].id + 1}`,
  });
  return { message: "user created" };
}

//get all users
export function getUsers(query: getUserQuery) {
  logger.info("Called getUsers");
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name.includes(q));
  }
  return users;
}

//return user by email
export function getUserByEmail(email: string) {
  logger.info("Called getUsersByEmail");
  return users.find(({ email: userEmail }) => userEmail === email);
}

//delete the user by the id
export function deleteUserById(index: number) {
  logger.info("Called deleteUserById");
  users.splice(index, 1);
  return { message: `user deleted` };
}

//update the user from the given Id
export function updateUserByIndex(
  index: number,
  updatedUserData: Partial<User>
) {
  logger.info("Called updateUserById");
  users[index] = { ...users[index], ...updatedUserData };
  return { message: `user updated` };
}
