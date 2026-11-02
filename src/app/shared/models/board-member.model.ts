import { BoardRole } from "../enums/board-role.enum";

export interface BoardMember {
  id?: string;
  name: string;
  preName: string;
  roles: (BoardRole | string)[];
  image: string;
  email?: string;
  phoneNumber?: string;
  order?: number;
}
