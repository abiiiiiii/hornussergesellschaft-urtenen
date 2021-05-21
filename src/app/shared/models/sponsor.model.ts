import {SponsorType} from "../enums/sponsor-type.enum";

export interface Sponsor {
  id: string;
  name: string;
  url: string;
  type: SponsorType;
}
