import { Key } from "antd/es/table/interface";

export interface IUser {
  _id?: Key;
  username: string;
  password?: string;
}
