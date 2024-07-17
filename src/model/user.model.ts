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
  //update user
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

  //get all users
  static getUsers(filter: getUserQuery) {
    const { q, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "email", "name")
      .table("users")
      .limit(size)
      .offset((page - 1) * size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  //count users
  static count(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}