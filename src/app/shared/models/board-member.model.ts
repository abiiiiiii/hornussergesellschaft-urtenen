import {BoardRole} from "../enums/board-role.enum";

export interface BoardMember {
  id: string;
  name: string;
  firstName: string;
  roles: BoardRole[];
  image: string;
}
