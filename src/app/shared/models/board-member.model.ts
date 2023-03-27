import {BoardRole} from "../enums/board-role.enum";

export interface BoardMember {
  id: string;
  name: string;
  preName: string;
  roles: BoardRole[];
  image: string;
}
