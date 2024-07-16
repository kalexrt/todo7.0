import express from "express";

import { authenticate, authorize } from "../middlewares/auth.middleware";

import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from "../controller/user.controller";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserBodySchema,
  userIdSchema,
} from "../schema/user.schema";

const router = express();

router
  .route("/")
  .get(
    authenticate,
    authorize("users.getAll"),
    validateReqQuery(getUserQuerySchema),
    getUsers
  )
  .post(
    authenticate,
    authorize("users.create"),
    validateReqBody(createUserBodySchema),
    createUser
  );

router
  .route("/:id")
  .get(
    authenticate,
    authorize("users.getById"),
    validateReqParams(userIdSchema),
    getUserById
  )
  .put(
    authenticate,
    authorize("users.updateById"),
    validateReqParams(userIdSchema),
    validateReqBody(updateUserBodySchema),
    updateUserById
  )
  .delete(
    authenticate,
    authorize("users.deleteById"),
    validateReqParams(userIdSchema),
    deleteUserById
  );

export default router;
