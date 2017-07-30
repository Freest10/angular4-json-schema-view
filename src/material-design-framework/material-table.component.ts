import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../json-schema-form.service';
/*import { RequestsDataService } from '../share/requests-data.service';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';*/

@Component({
  selector: 'material-list-widget',
  template: `
    <!---<md-table #table [dataSource]="dataSource">

      <ng-container cdkColumnDef="userId">
        <md-header-cell *cdkHeaderCellDef> ID </md-header-cell>
        <md-cell *cdkCellDef="let row"> {{row.id}} </md-cell>
      </ng-container>

      <ng-container cdkColumnDef="progress">
        <md-header-cell *cdkHeaderCellDef> Progress </md-header-cell>
        <md-cell *cdkCellDef="let row"> {{row.progress}}% </md-cell>
      </ng-container>

      <ng-container cdkColumnDef="userName">
        <md-header-cell *cdkHeaderCellDef> Name </md-header-cell>
        <md-cell *cdkCellDef="let row"> {{row.name}} </md-cell>
      </ng-container>


      <ng-container cdkColumnDef="color">
        <md-header-cell *cdkHeaderCellDef>Color</md-header-cell>
        <md-cell *cdkCellDef="let row" [style.color]="row.color"> {{row.color}} </md-cell>
      </ng-container>

      <md-header-row *cdkHeaderRowDef="displayedColumns"></md-header-row>
      <md-row *cdkRowDef="let row; columns: displayedColumns;"></md-row>
    </md-table>
    -->
  `
})
export class MaterialTableComponent implements OnInit {
  @Input() layoutNode: any;
  formControl: AbstractControl;
  controlValue: any;
  controlName: string;
  options: any;
  selectList: any[];
  controlDisabled: boolean = false;

  constructor(
    private jsf: JsonSchemaFormService,
    //private req: RequestsDataService
  ) { }


  async ngOnInit() {
    /*this.options = this.layoutNode.options;
    if(this.options.reqUrl){
      let data = await this.getSelectListByReqest(this.options.reqUrl);
      this.selectListData(data);
    }else{
      this.selectList = this.options.data;
    }
    this.jsf.initializeControl(this);
  */
  }

  set selectListData(data){
    if(data instanceof Array) this.selectList =data;
  }

  /*getSelectListByReqest(url){
    return new Promise((resolve, reject)=> {
      this.req.getData(url).subscribe(
        (data) => resolve(data),
        error => {
          reject();
          console.error("Bad request");
        }
      )
    });
  }*/

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
