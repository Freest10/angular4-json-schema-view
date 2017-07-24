import { Injectable }            from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { Http }                  from '@angular/http';
import { Observable }            from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestsDataService {

  constructor(private http: Http, private jsf: JsonSchemaFormService) {}

  getData(url: string) {
    let urlApi = this.jsf.schemaOptions["apiUrl"] || "";
    return this.http
      .get(`${urlApi}${url}`)
  }

}
