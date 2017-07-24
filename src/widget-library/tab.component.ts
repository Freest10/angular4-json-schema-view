import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab-widget',
  template: `
      <root-widget
        [layout]="layoutNode.items"
      ></root-widget>
  `,
})
export class TabComponent {
  @Input() layoutNode: any;

}
