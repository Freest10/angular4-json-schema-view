import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { ShareWidgetMethodsService }    from '../share/share-widgets-methods.service';

@Component({
  selector: 'radios-widget',
  template: `
    <label *ngIf="options?.title"
      [attr.for]="'control' + layoutNode?._id"
      [class]="options?.labelHtmlClass"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>
      <div [ngSwitch]="layoutOrientation">

        <!-- 'horizontal' = radios-inline or radiobuttons -->
        <div *ngSwitchCase="'horizontal'"
          [class]="options?.htmlClass">
          <label *ngFor="let radioItem of selectList"
            [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
            [class]="options?.itemLabelHtmlClass +
              ((controlValue + '' === radioItem?.value + '') ?
              (' ' + options?.activeClass + ' ' + options?.style?.selected) :
              (' ' + options?.style?.unselected))">
            <input type="radio"
              [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
              [attr.readonly]="options?.readonly ? 'readonly' : null"
              [attr.required]="options?.required"
              [checked]="radioItem?.value === controlValue"
              [class]="options?.fieldHtmlClass"
              [disabled]="controlDisabled"
              [name]="controlName"
              [value]="radioItem?.value"
              (change)="updateValue($event)">
            <span [innerHTML]="radioItem?.text"></span>
          </label>
        </div>

        <!-- 'vertical' = regular radios -->
        <div *ngSwitchDefault>
          <div *ngFor="let radioItem of selectList"
            [class]="options?.htmlClass">
            <label
              [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
              [class]="options?.itemLabelHtmlClass +
                ((controlValue + '' === radioItem?.value + '') ?
                (' ' + options?.activeClass + ' ' + options?.style?.selected) :
                (' ' + options?.style?.unselected))">
              <input type="radio"
                [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
                [attr.readonly]="options?.readonly ? 'readonly' : null"
                [attr.required]="options?.required"
                [checked]="radioItem?.value === controlValue"
                [class]="options?.fieldHtmlClass"
                [disabled]="controlDisabled"
                [name]="controlName"
                [value]="radioItem?.value"
                (change)="updateValue($event)">
              <span [innerHTML]="radioItem?.text"></span>
            </label>
          </div>
        </div>

      </div>
      <error-messages-widget [control]="this"></error-messages-widget>
  `,
})
export class RadiosComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  options: any;
  layoutOrientation: string = 'vertical';
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

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
