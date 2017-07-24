import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'material-checkbox-widget',
  template: `
      <md-checkbox
        align="left"
        [color]="options?.color || 'primary'"
        [disabled]="controlDisabled || options?.readonly"
        [name]="controlName"
        [checked]="controlValue"
        (change)="updateValue($event)">
        <span *ngIf="options?.title"
              [style.display]="options?.notitle ? 'none' : ''"
              [innerHTML]="options?.title"></span>
      </md-checkbox>
      <error-messages-widget [control]="this"></error-messages-widget>
  `,
})
export class MaterialCheckboxComponent implements OnInit {
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
    this.jsf.updateValue(this, event.checked);
  }

  setDisableInput(){
    this.jsf.disable(this, true);
  }

}
