import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { RequestsDataService } from '../share/requests-data.service';

@Component({
  selector: 'list-widget',
  template: `
    <div
      [class]="options?.htmlClass">
      <h3>{{options?.title}}</h3>
      <ng-container *ngIf="selectList">
        <ul *ngFor="let list of selectList">
          <li
            (click)="selectData(list)"
          >
            <span *ngIf="list.icon">{{list.icon}}</span>
            <p> {{list.name}}</p>
          </li>
        </ul>
      </ng-container>
      <error-messages-widget [control]="this"></error-messages-widget>
    </div>
  `
})
export class ListComponent implements OnInit {
  @Input() layoutNode: any;
  formControl: AbstractControl;
  controlValue: any;
  controlName: string;
  options: any;
  selectList: any[];
  controlDisabled: boolean = false;

  constructor(
    private jsf: JsonSchemaFormService,
    private req: RequestsDataService
  ) { }

  async ngOnInit() {
    this.options = this.layoutNode.options;
    if(this.options.reqUrl){
      let data = await this.getSelectListByReqest(this.options.reqUrl);
      this.selectListData(data);
    }else{
      this.selectList = this.options.data;
    }
    this.jsf.initializeControl(this);
  }

  set selectListData(data){
    if(data instanceof Array) this.selectList =data;
  }

  getSelectListByReqest(url){
    return new Promise((resolve, reject)=> {
      this.req.getData(url).subscribe(
        (data) => resolve(data),
        error => {
          reject();
          console.error("Bad request");
        }
      )
    });
  }

  selectData(list){
    let valueToSet = null;
    if(this.layoutNode.valueType == "string" || this.layoutNode.valueType == "number"){
      valueToSet = list["value"];
    }else if(this.layoutNode.valueType == "object"){
      valueToSet = list;
    }
    this.updateValue(valueToSet);
  }

  updateValue(value) {
    this.jsf.updateValue(this, value);
  }

}
