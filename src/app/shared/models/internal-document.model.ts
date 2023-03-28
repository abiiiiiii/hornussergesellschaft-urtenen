import {Observable} from "rxjs";

export interface InternalDocument {
  id?: string;
  name: string;
  fileName: string;
  fileLink$?: Observable<string>;
}
