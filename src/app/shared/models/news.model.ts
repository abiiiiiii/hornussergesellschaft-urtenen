import { CreatedAt } from "./created-at.interface";

export interface News extends CreatedAt {
  id?: string;
  title: string;
  description: string[];
  flyer?: string;
  image: string;
  active: boolean;
  date?: any;
}
