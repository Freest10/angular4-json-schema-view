import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'checkbox-widget',
  template: `
    <div
      [class]="options?.htmlClass">
      <label
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.itemLabelHtmlClass">
        <input
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [checked]="isChecked ? 'checked' : null"
          [class]="options?.fieldHtmlClass + (isChecked ?
            (' ' + options?.activeClass + ' ' + options?.style?.selected) :
            (' ' + options?.style?.unselected))"
          [disabled]="controlDisabled"
          [id]="'control' + layoutNode?._id"
          [name]="controlName"
          [readonly]="options?.readonly ? 'readonly' : null"
          [value]="controlValue"
          type="checkbox"
          (change)="updateValue($event)">
        <span *ngIf="options?.title"
          [style.display]="options?.notitle ? 'none' : ''"
          [innerHTML]="options?.title"></span>
      </label>
      <ng-container *ngIf="formControl.errors && jsf.submited" class="alert alert-danger">
        <div *ngIf="formControl.errors.required">
          {{options?.validateMessages?.required}}
        </div>
      </ng-container>
    </div>
  `,
})
export class CheckboxComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;
  trueValue: any = true;
  falseValue: any = false;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
    if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = this.options.title;
    }
  }

  updateValue(event) {
    event.preventDefault();
    this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
  }

  get isChecked() {
    return this.controlValue;
    //return this.jsf.getControlValue(this);
  }
}
