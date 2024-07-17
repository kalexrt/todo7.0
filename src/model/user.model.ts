import { getUserQuery, User } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base";

const logger = loggerWithNameSpace("UserModel");

export class UserModel extends BaseModel {
  //create user
  static async create(user: User, createdBy: string) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
      created_by: createdBy,
    };

    await this.queryBuilder().insert(userToCreate).table("users");
  }
  static async update(id: string, user: User, updatedBy: string) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: new Date(),
      updated_by: updatedBy
    };
    await this.queryBuilder().update(userToUpdate).table("users").where({ id });
  }

  //get user by email
  static async getByEmail(email: string) {
    logger.info("Called getByEmail");

    const result = await this.queryBuilder()
      .select("users.id", "users.email", "users.name", "users.password")
      .from("users")
      .where("users.email", email);

    const permArray = await this.getPermissions(result[0].id);
    result[0].permissions = permArray;
    return result[0];
  }

  //get user permissions
  static async getPermissions(id: number) {
    logger.info("Called getPermissions");

    const permissionId = await this.queryBuilder()
      .select("permission_id")
      .from("user_permissions")
      .where("user_id", id);

    const permissions = await Promise.all(
      permissionId.map(async (permission) => {
        const result = await this.queryBuilder()
          .select("permissions")
          .from("permissions")
          .where({ id: permission.permission_id });
        return result[0].permissions;
      })
    );
    return permissions;
  }

  //get user by id
  static async getUserById(id: string){
    return await this.queryBuilder()
    .select('*')
    .from('users')
    .where({id})
    .first();
  }

  //delete the user by the id
  static async deleteUserById(id: string) {
    logger.info("Called deleteUserById");
    return await this.queryBuilder().delete().from("users").where({ id });
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


//get all users
export function getUsers(query: getUserQuery) {
  logger.info("Called getUsers");
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name.includes(q));
  }
  return users;
}
