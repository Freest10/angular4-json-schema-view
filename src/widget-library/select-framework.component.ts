import {
  Component, ComponentFactoryResolver, ComponentRef, Input,
  OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'select-framework-widget',
  template: `<div #widgetContainer></div>`,
})
export class SelectFrameworkComponent implements OnChanges, OnInit {
  componentRef: ComponentRef<any> = null;
  @Input() layoutNode: any;
  private layotInstance: any;
  @ViewChild('widgetContainer', { read: ViewContainerRef })
    widgetContainer: ViewContainerRef;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit(){
    this.initWidget();
  }

  ngOnChanges(){
    this.initWidget();
  }

  initWidget(){
    this.widgetBuild(this.layoutNode);
  }

  getWidgetComponent(widgetName){
      if(this.jsf.widgetLibrary.activeWidgets.hasOwnProperty(widgetName)){
        if(this.jsf.widgetLibrary.activeWidgets[widgetName]){
          return this.jsf.widgetLibrary.activeWidgets[widgetName];
        }
      }
     let defaultWidgetName = this.jsf.schemaOptions["defaultWidget"];
     return this.jsf.widgetLibrary.activeWidgets[defaultWidgetName];
  }

  widgetBuild(item){
      let layout = this.jsf.generateOptions(item);
      if(!layout.hasOwnProperty("type") && this.jsf.hasOwnProperty("defaultWidget")){
        layout["type"]=this.jsf["defaultWidget"];
      }

      if(!this.componentRef){
        let component = this.getWidgetComponent(layout["type"]);
        let componentFactory = this.componentFactory.resolveComponentFactory(component);
        this.componentRef = this.widgetContainer.createComponent(componentFactory);
        this.jsf.initWidget(this.componentRef.instance, layout);
        this.componentRef.instance.layoutNode = layout;
        this.componentRef.instance.layoutNode._id = Math.random();
      }

      if(layout.hasOwnProperty("key")){
        this.componentRef.instance.controlName = layout["key"];
      }
  }


}
