import { Component, Input, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'section-widget',
  template: `
   <div
     [ngClass]="getWrapDivClass()"
   >
   <label *ngIf="options?.title"
   [class]="options?.labelHtmlClass"
   [style.display]="options?.notitle ? 'none' : ''"
   [innerHTML]="options?.title"
   (click)="expand()"></label>

   <root-widget [hidden]="!expanded"
    [layout]="outLayoutNode"
    ></root-widget>

   </div>`,
  styles: [`
    .expandable > label:before { content: '▶'; padding-right: .3em; }
    .expanded > label:before { content: '▼'; padding-right: .2em; }
  `],
})
export class SectionComponent implements OnInit {
  expanded: boolean = true;
  public options: any;
  @Input() layoutNode: any;
  outLayoutNode;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    if(this.layoutNode.hasOwnProperty("items")){
      this.outLayoutNode=this.layoutNode["items"];
    }
    this.options = this.layoutNode.options;
    if(this.options.hasOwnProperty("expandable")) this.expanded = !this.options.expandable;
  }

  getWrapDivClass(){
    let wrpaDivClass = [];
    if(this.options.htmlClass){
      wrpaDivClass.push(this.options.htmlClass);
    }

    if(typeof this.options.expandable == "boolean"){
      if(this.expanded){
        wrpaDivClass.push("expanded");
      }else{
        wrpaDivClass.push("expandable");
      }
    }
    return wrpaDivClass;
  }

  expand() {
    if(this.options.hasOwnProperty("expandable")) { this.expanded = !this.expanded; }
  }

  getOption(){

  }
}
