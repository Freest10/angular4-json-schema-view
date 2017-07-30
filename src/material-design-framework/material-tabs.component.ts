import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { JsonSchemaFormService } from '../json-schema-form.service';


@Component({
  selector: 'material-tabs-widget',
  template: `
    <md-tab-group (selectChange)="select($event)">
      <md-tab  *ngFor="let layoutItem of layoutNode?.items;  let i = index" [label]="setTitle(layoutItem, i)" >

        <select-framework-widget [class]="options?.fieldHtmlClass + ' ' + options?.activeClass + ' ' + options?.style?.selected"
                                 [layoutNode]="layoutItem"></select-framework-widget>
        
      </md-tab>
    </md-tab-group>
  `,
  styles: [`a { cursor: pointer; }`],
})
export class MaterialTabsComponent implements OnInit {
  options: any;
  itemCount: number;
  selectedItem: number = 0;
  showAddTab: boolean = true;
  private widgetSubject = new Subject<any>();
  @Input() layoutNode: any;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }


  ngOnInit() {
    this.options = this.layoutNode.options;
    if(!this.options.maxItems) this.options.maxItems = 9999;
    this.itemCount = this.layoutNode.items.length - 1;
    this.updateControl();
  }

  select(event) {
    let index = event.index;
    this.selectedItem = index;

    if (this.layoutNode.items[index].dataType == '$ref') {
      this.jsf.addTabItem(this);
      this.updateControl();
    };
    this.widgetSubject.next('tabSelected');

  }

  updateControl() {
    if (this.layoutNode.items.length >= this.options.maxItems) {
      this.showAddTab = false;
    }
  }

  setTitle(item: any = null, index: number = null): string {

    if(item.dataType == "$ref"){

      return item.addButtonTitle;

    }else if(/{{.+?}}/g.test(item.title)){

      let textTitleInQuotes = item.title.match( /'.+?'/g );
      let textNumInString = "{{'Вкладка'+$index }}".search(/\$index/g);
      let textTitle = "";
      if(textTitleInQuotes){
        textTitle = textTitleInQuotes[0].replace("'", "").replace("'", "");
      }

      let indexNumInString;
      if(/\$index/g.test("{{'Вкладка'+$index }}")){
          indexNumInString = "{{'Вкладка'+$index }}".search(/\$index/g);
      }

      let resultString: any = "";
      let tabIndex = index;
      tabIndex++;
      if(textNumInString && indexNumInString){
        if(textNumInString > indexNumInString){
          resultString = tabIndex+textTitle;
        }else{
          resultString = textTitle+tabIndex;
        }
      }else if(textNumInString && !indexNumInString){
        resultString = textTitle;
      }else if(!textNumInString && indexNumInString){
        resultString = tabIndex;
      }
      return resultString;
    }

    return item.title;

  }
}
