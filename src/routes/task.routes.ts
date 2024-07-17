import express from "express";
import {
  getAllTasks,
  deleteTaskById,
  createTask,
  getTaskById,
  updateTaskById,
} from "../controller/task.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import {
  createTaskBodySchema,
  getTaskQuerySchema,
  taskIdSchema,
  updateTaskBodySchema,
} from "../schema/task.schema";

const router = express();

router
  .route("/")
  .get(authenticate, validateReqQuery(getTaskQuerySchema), getAllTasks)
  .post(authenticate, validateReqBody(createTaskBodySchema), createTask);

router
  .route("/:id")
  .get(authenticate, validateReqParams(taskIdSchema), getTaskById)
  .put(
    authenticate,
    validateReqParams(taskIdSchema),
    validateReqBody(updateTaskBodySchema),
    updateTaskById
  )
  .delete(authenticate, validateReqParams(taskIdSchema), deleteTaskById);

export default router;
