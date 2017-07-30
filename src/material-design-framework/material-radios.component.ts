import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { ShareWidgetMethodsService }    from '../share/share-widgets-methods.service';

@Component({
  selector: 'material-radios-widget',
  template: `
    <div
      [class]="options?.htmlClass">
      <div *ngIf="options?.title">
        <label
          [attr.for]="'control' + layoutNode?._id"
          [class]="options?.labelHtmlClass"
          [style.display]="options?.notitle ? 'none' : ''"
          [innerHTML]="options?.title"></label>
      </div>
      <md-radio-group
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [disabled]="controlDisabled"
        [name]="controlName"
        [value]="controlValue">
        <div *ngFor="let radioItem of selectList">
          <md-radio-button
            [id]="'control' + layoutNode?._id + '/' + radioItem?.text"
            [value]="radioItem?.value"
            (click)="updateValue(radioItem?.value)">
            <span [innerHTML]="radioItem?.text"></span>
          </md-radio-button>
        </div>
      </md-radio-group>
      <error-messages-widget [control]="this"></error-messages-widget>
    </div>
  `,
  styles: [`
    md-radio-group { display: inline-flex; }
    md-radio-button { margin: 0 5px; }
  `]
})
export class MaterialRadiosComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  options: any;
  selectList: any[] = [];
  @Input() layoutNode: any;

  constructor(
    private jsf: JsonSchemaFormService,
    private swm: ShareWidgetMethodsService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.swm.setSelectList(this, true);
    this.jsf.initializeControl(this);
  }

  updateValue(value) {
    this.jsf.updateValue(this, value);
  }
}
