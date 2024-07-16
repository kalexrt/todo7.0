import { Request as ExpressRequest } from "express";
import { User } from "./user.interface";

export interface Request extends ExpressRequest{
    user?:User;
}