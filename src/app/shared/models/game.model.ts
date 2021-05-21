import {GameMode} from "../enums/game-mode.enum";

export interface Game {
  id: string;
  mode: GameMode;
  report: string;
  date: Date;
  homeId: string;
  awayId: string;
  teamId: string;
}

