import { Key } from "react";
import { IUser } from "./IUser";

interface IAutor {
  _id: Key | null;
  username: string;
}

export interface IEvent {
  _id?: Key;
  author: IAutor;
  guests: IUser[];
  date: string;
  description: string;
  text: string;
  role?: string;
}