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
  /*formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];*/
  controlName: string;
  options: any;
  @Input() layoutNode: any;
  public funcOnClick: any;
  private widgetSubject = new Subject<any>();

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  clickOnButton(){
    this.widgetSubject.next('buttonClick');
  }


  ngOnInit() {
    console.log(this, 'layoutNode');
    this.options = this.layoutNode.options;
   // this.jsf.initializeControl(this);
  }

  //buttonClick(){
    /*return new Observable(observer => {
      observer.next(42);
      observer.complete();
    })*/
    //if(typeof this.funcOnClick == 'function') this.funcOnClick();
    //console.log(Observable, 'Observable Input');
  //}

  updateValue(event) {
    /*if (typeof this.options.onClick === 'function') {
      this.options.onClick(event);
    } else {
      this.jsf.updateValue(this, event.target.value);
    }*/
  }
}
