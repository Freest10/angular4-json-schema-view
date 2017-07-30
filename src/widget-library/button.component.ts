import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'button-widget',
  template: `
      <div
        [class]="options?.htmlClass">
        <input
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [attr.required]="options?.required"
          [class]="options?.fieldHtmlClass"
          [disabled]="options?.disabled"
          [name]="controlName"
          [type]="layoutNode?.type"
          [value]="options?.title"
          (click)="clickOnButton($event)">
      </div>
  `
})
export class ButtonComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlDisabled: boolean = false;
  options: any;
  @Input() layoutNode: any;
  public funcOnClick: any;
  private widgetSubject = new Subject<any>();

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
  }

  clickOnButton(){
    this.widgetSubject.next('buttonClick');
    if(this.options.reset){
      this.jsf.formGroup.reset();
    }
  }
}
