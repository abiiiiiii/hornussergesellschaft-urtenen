import {Player} from "./player.model";
import {Game} from "./game.model";

export interface Team {
  id: string;
  name: string;
  image: string;
  imageUrl?: string;
  players: Player[];
  games: string[];
}
