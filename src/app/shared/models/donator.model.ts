import { Observable } from 'rxjs';

export type DonatorCategory = 'COMPANY' | 'PRIVATE';

export interface Donator {
  id?: string;
  name: string;
  category: DonatorCategory;
  city?: string;
  url?: string;
  email?: string;
  image?: string;
  order?: number;
  imageUrl$?: Observable<string>;
}

