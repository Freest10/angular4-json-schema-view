import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'material-button-widget',
  template: `
    <div [class]="options?.htmlClass">
      <button md-raised-button
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [name]="controlName"
        [type]="layoutNode?.type"
        (click)="clickOnButton($event)">
        <md-icon *ngIf="options?.icon" class="md-24">{{options?.icon}}</md-icon>
        <span *ngIf="options?.title" [innerHTML]="options?.title"></span>
      </button>
    </div>`,
    styles: [`button { margin-top: 10px; }`],
})
export class MaterialButtonComponent implements OnInit {
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
