import {GameMode} from "../enums/game-mode.enum";
import {Result} from "./result.model";
import {CreatedAt} from "./created-at.interface";

export interface Game extends CreatedAt{
  id?: string;
  mode: GameMode;
  report?: string;
  homeList: string;
  awayList?: string;
  reportFile?: string;
  homeResult: Result;
  awayResult?: Result;
  festivalName?: string;
  rank?: number;
}

