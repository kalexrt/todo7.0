import { Request as ExpressRequest } from "express";
import { User } from "./user.interface";

// export interface Request extends ExpressRequest{
//     user?:User;
// }

export interface Request<P = {}, ResBody = any, ReqBody = any, ReqQuery = {}>
  extends ExpressRequest<P, ResBody, ReqBody, ReqQuery> {
  user?: User;
}