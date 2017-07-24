import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'material-textarea-widget',
  template: `
    <md-input-container [style.width]="'100%'">
      <textarea mdInput #inputControl
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [required]="options?.required"
        [disabled]="controlDisabled"
        [name]="controlName"
        [placeholder]="options?.title"
        [readonly]="options?.readonly ? 'readonly' : null"
        [style.width]="'100%'"
        [value]="controlValue"
        (input)="updateValue($event)"></textarea>
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
      <md-hint *ngIf="!options?.description && options?.placeholder && !formControl?.dirty"
        align="end">{{options?.placeholder}}</md-hint>
    </md-input-container>
    <error-messages-widget [control]="this"></error-messages-widget>
  `,
    styles: [`md-input-container { margin-top: 6px; }`],
})
export class MaterialTextareaComponent implements OnInit {
  @Input() layoutNode: any;
  formControl: AbstractControl;
  controlValue: any;
  controlName: string;
  options: any;
  controlDisabled: boolean = false;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }


  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }

  setDisableInput(){
    this.jsf.disable(this, true);
  }
}
