import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'material-input-widget',
  template: `
    <md-input-container>
      <input mdInput #inputControl
        [value]="controlValue"
        [placeholder]="options?.title ? options?.title : options?.placeholder"
        [disabled]="controlDisabled"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        (input)="updateValue($event)"
        >
    </md-input-container>
    <error-messages-widget [control]="this"></error-messages-widget>
  `
})
export class MaterialInputComponent implements OnInit {
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
