import {CreatedAt} from "./created-at.interface";

export interface News extends CreatedAt{
  id?: string;
  title: string;
  description: string[];
  isEvent: boolean;
  flyer?: string;
  image: string;
}
