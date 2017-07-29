import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { ShareWidgetMethodsService }    from '../share/share-widgets-methods.service';


@Component({
  selector: 'select-widget',
  template: `
    <div
      [class]="options?.htmlClass">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <select
        [id]="'control' + layoutNode?._id"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass"
        [disabled]="controlDisabled"
        [name]="controlName"
        (input)="updateValue($event)">
        <error-messages-widget [control]="this"></error-messages-widget>
      </select>
    </div>`,
})
export class SelectComponent implements OnInit {
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
    this.jsf.initializeControl(this);
    this.swm.setSelectList(this);
  }

  isSelected(item){
    if(this.layoutNode.valueType == "object"){
      if(this.controlValue){
        if(item.value === this.controlValue.value){
          return true;
        }
      }
    }else{
      if(item.value === this.controlValue){
        return true;
      }
    }
  }

  updateValue(event) {
    let value = event.target.value;
    let isEmptyOption = event.target.selectedOptions[0].getAttribute("emptyOption");
    if(this.layoutNode.valueType == "object"){
      let valueObject = null;
      if(isEmptyOption == "false"){
        valueObject = this.getObjectByValueFromSelectList(value);
      }
      this.jsf.updateValue(this, valueObject);
    }else {
      if(isEmptyOption == "true"){
        value = null;
      }
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
