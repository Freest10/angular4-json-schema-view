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
  @Input() layoutNode: any;

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
  }

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
  }

  setTitle(): string { console.log(this.options.reference, 'this.options.reference');
    if(this.options.reference){ console.log(this.options.reference.addButtonTitle, 'this.options.reference.addButtonTitle');
     if(this.options.reference.addButtonTitle) return this.options.reference.addButtonTitle;
    }
  }
}
