import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'hidden-widget',
  template: `
    <input
      [disabled]="controlDisabled"
      [name]="controlName"
      type="hidden"
      [value]="controlValue">`,
})
export class HiddenComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  @Input() layoutNode: any;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.jsf.initializeControl(this);
  }
}
