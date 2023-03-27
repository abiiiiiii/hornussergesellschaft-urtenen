import {SponsorType} from "../enums/sponsor-type.enum";

export interface Sponsor {
  id?: string;
  name: string;
  url: string;
  image: string;
  street?: string;
  email?: string;
  postalCode?: number;
  phoneNumber?: number;
  city?: string;
  type: SponsorType;
  description?: string
}
