import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { ShareWidgetMethodsService }    from '../share/share-widgets-methods.service';

@Component({
  selector: 'material-select-widget',
  template: `
    <section [style.width]="'100%'" [class]="options?.htmlClass || null">
      <md-select #inputControl
        [attr.name]="controlName"
        [(ngModel)]="(controlValue?.value) ? controlValue?.value : controlValue"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [floatPlaceholder]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
        [id]="'control' + layoutNode?._id"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [required]="options?.required"
        [style.margin-top]="'4px'"
        [style.width]="'100%'"
        (change)="updateValue($event)">
        <md-option *ngFor="let selectItem of selectList"
          [value]="selectItem.value"
          >{{selectItem.text}}</md-option>
      </md-select>
    </section>
    <error-messages-widget [control]="this"></error-messages-widget>
  `
})
export class MaterialSelectComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any = null;
  controlDisabled: boolean = false;
  options: any;
  selectList: any[] = [];
  selectedValue: any = null;
  @Input() layoutNode: any;

  constructor(
    private jsf: JsonSchemaFormService,
    private swm: ShareWidgetMethodsService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
    this.swm.setSelectList(this);
  }

  updateValue(event) {
    let value = event.value;
    if(this.layoutNode.valueType == "object"){
      let valueObject = null;
      if(value !== null) valueObject = this.getObjectByValueFromSelectList(value);
      this.jsf.updateValue(this, valueObject);
    }else {
      this.jsf.updateValue(this, value);
    }
  }

  getObjectByValueFromSelectList(value){
    let valueObject = {};
    this.selectList.forEach((listOfSelect)=>{
      if(listOfSelect["value"] == value){
        valueObject = listOfSelect;
        return false;
      }
    })
    return valueObject;
  }
}
