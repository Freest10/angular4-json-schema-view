import { Injectable } from '@angular/core';

@Injectable()
export class JsonSchemaShareOptionsService {

  shareOptions: Object = {}

  setShareOptions(options){
    this.shareOptions = Object.assign(this.shareOptions, options);
  }
}
