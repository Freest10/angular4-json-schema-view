import { Component, Input,  ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
//<ng-container #widgetContainer></ng-container>
@Component({
  selector: 'root-widget',
  template: `
    <ng-container *ngFor="let layoutItem of layout; let i = index">
      <select-framework-widget [layoutNode]="layoutItem"></select-framework-widget>
    </ng-container>
  `,
  styles: [`
    [draggable=true] { cursor: move; }
    [draggable=true]:hover {
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      position: relative; z-index: 10;
      margin-top: -4px;
      margin-left: -4px;
      margin-right: 2px;
      margin-bottom: 2px;
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
    }
    [draggable=true].drag-target-top {
      box-shadow: 0 -2px 0 #000;
      position: relative; z-index: 20;
    }
    [draggable=true].drag-target-bottom {
      box-shadow: 0 2px 0 #000;
      position: relative; z-index: 20;
    }
  `],
})
export class RootComponent implements  OnInit{
  options: any;
 // @Input() formID: number;
  @Input() layout: any[];
  private formExmplr: any;
  private componentRef:ComponentRef<any> = null;

  constructor(
   // private componentFactory: ComponentFactoryResolver,
   // private jsf: JsonSchemaFormService
  ){
    console.log(this,'rootWidget');
  }

  ngOnInit(){

  }
  /*isDraggable(node: any): boolean {
    return this.isOrderable !== false && node.type !== '$ref' &&
      node.arrayItem && node.options.arrayItemType === 'list';
      // && (this.layout[this.layout.length - 1].tupleItems || this.layout.length > 2);
  }

  trackByItem(layoutItem: any) {
    return layoutItem && layoutItem._id;
  }*/



 /* renderComponent(){
    if (this.componentRef) this.componentRef.instance.value = this.value;
  }*/
}
