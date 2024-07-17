import { STATUS } from "./status.interface"
export interface ITask{
    id:number,
    name:string,
    status:STATUS,
    userId:number
}

export interface getTaskQuery {
    q?: string;
    page?: number;
    size?: number;
}
