import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'tabs-widget',
  template: `
    <ul
      [class]="options?.labelHtmlClass">
      <li *ngFor="let item of layoutNode?.items; let i = index"
        [class]="options?.itemLabelHtmlClass + (selectedItem === i ?
          (' ' + options?.activeClass + ' ' + options?.style?.selected) :
          (' ' + options?.style?.unselected))"
        role="presentation"
        data-tabs>
        <a *ngIf="showAddTab || item.type !== '$ref'"
          [innerHTML]="setTitle(item, i)"
          (click)="select(i)"></a>
      </li>
    </ul>

    <div *ngFor="let layoutItem of layoutNode?.items; let i = index"
      [class]="options?.htmlClass">

      <div [hidden]="isHidden(i)">

       <select-framework-widget 
        [class]="options?.fieldHtmlClass + ' ' + options?.activeClass + ' ' + options?.style?.selected"
        [layoutNode]="layoutItem"></select-framework-widget>
      </div>
    </div> `,
  styles: [`a { cursor: pointer; }`],
})
export class TabsComponent implements OnInit {
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

  select(index) {
      this.selectedItem = index;
      if (this.layoutNode.items[index].dataType == '$ref') {
        this.jsf.addTabItem(this);
        this.updateControl();
      }
      this.widgetSubject.next('tabSelected');
  }

  updateControl() {
    if (this.layoutNode.items.length >= this.options.maxItems) { console.log("showAddTab");
      this.showAddTab = false;
    }
  }

  isHidden(index){
    if(this.selectedItem == index) return false;
    return true;
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
