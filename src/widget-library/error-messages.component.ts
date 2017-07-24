import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'error-messages-widget',
  template: `
    <div *ngIf="control.formControl.errors && jsf.submited" [ngClass]="getWrapClass()" >
      <div *ngIf="control.formControl.errors.required">
        {{control.options?.validateMessages?.required}}
      </div>
      <div *ngIf="control.formControl.errors.minlength">
        {{control.options?.validateMessages?.minLength}}
      </div>
      <div *ngIf="control.formControl.errors.maxlength">
        {{control.options?.validateMessages?.maxLength}}
      </div>
      <div *ngIf="control.formControl.errors.pattern">
        {{control.options?.validateMessages?.pattern}}
      </div>
    </div>
  `,
  styles: [`.alert-danger {
    color: #ff491f;font-size:13px;
  }`],
})
export class ErrorMessagesComponent {
  @Input() control: any;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  getWrapClass(){
    let errorWrapClasses = [];
    if(this.control.options.errorClass){
      errorWrapClasses.push(this.control.options.errorClass);
    }else{
      errorWrapClasses.push("alert alert-danger");
    }
    return errorWrapClasses;
  }

}
