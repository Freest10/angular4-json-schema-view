import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'material-add-reference-widget',
  template: `
    <section [class]="options?.htmlClass" align="end">
      <button md-raised-button *ngIf="showAddButton"
        [color]="options?.color || 'accent'"
        [disabled]="options?.readonly"
        (click)="addItem($event)">
        <span *ngIf="options?.icon" [class]="options?.icon"></span>
        <span *ngIf="options?.addButtonTitle" [innerHTML]="options?.addButtonTitle"></span>
      </button>
    </section>`,
})
export class MaterialAddReferenceComponent implements OnInit {
  options: any;
  itemCount: number;
  showAddButton: boolean = true;
  previousLayoutIndex: number[];
  previousDataIndex: number[];
 // @Input() formID: number;
  @Input() layoutNode: any;
 // @Input() layoutIndex: number[];
 // @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    console.log(this, 'MaterialAddReferenceComponent');
    //this.updateControl();
  }

  /*ngDoCheck() {
    if (this.previousLayoutIndex !== this.layoutIndex ||
      this.previousDataIndex !== this.dataIndex
    ) {
      this.updateControl();
    }
  }*/

  addItem(event) {
    event.preventDefault();
    this.jsf.addItem(this);
    this.updateControl();
  }

  updateControl() {
    if(this.options.reference.currentItems >= this.options.reference.items[0]["maxItems"]){
      this.showAddButton = false;
    }else{
      this.showAddButton = true;
    }
    /*this.itemCount = this.layoutIndex[this.layoutIndex.length - 1];
    this.previousLayoutIndex = this.layoutIndex;
    this.previousDataIndex = this.dataIndex;
    this.showAddButton = this.layoutNode.arrayItem &&
      this.itemCount < (this.options.maxItems || 1000000);
  */
  }

  setTitle(): string { console.log(this.options.reference, 'this.options.reference');
    if(this.options.reference){ console.log(this.options.reference.addButtonTitle, 'this.options.reference.addButtonTitle');
     if(this.options.reference.addButtonTitle) return this.options.reference.addButtonTitle;
    }
    /*const parent: any = {
      dataIndex: this.dataIndex.slice(0, -1),
      layoutNode: this.jsf.getParentNode(this)
    };*/

  }
}
