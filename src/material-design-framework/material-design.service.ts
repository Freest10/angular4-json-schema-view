import { Injectable }                            from '@angular/core';
import { MaterialInputComponent }                from './material-input.component';
import { MaterialButtonComponent }               from './material-button.component';
import { MaterialListComponent }                 from './material-list.component';
import { MaterialCheckboxComponent }             from './material-checkbox.component';
import { MaterialAddReferenceComponent }         from './material-add-reference.component';
import { MaterialTextareaComponent }             from './material-textarea.component';
import { MaterialTabsComponent }                 from './material-tabs.component';
import { MaterialSelectComponent }               from './material-select.component';
import { MaterialNumberComponent }               from './material-number.component';
import { MaterialRadiosComponent }               from './material-radios.component';
import { MaterialSliderComponent }               from './material-slider.component';
import {MaterialDatepickerComponent}             from './material-datepicker.component';
import {MaterialTableComponent}                  from './material-table.component';

@Injectable()
export class MaterialDesignLibraryService {

  public frameworkName: string = "material-design";

  public widgetLibrary: any = {
    'text': MaterialInputComponent,
    'string': MaterialInputComponent,
    'button': MaterialButtonComponent,
    'submit': MaterialButtonComponent,
    'list': MaterialListComponent,
    'checkbox': MaterialCheckboxComponent,
    'textarea': MaterialTextareaComponent,
    '$ref' : MaterialAddReferenceComponent,
    'tabs' : MaterialTabsComponent,
    'select': MaterialSelectComponent,
    'number': MaterialNumberComponent,
    'integer': MaterialNumberComponent,
    'radios': MaterialRadiosComponent,
    'slider': MaterialSliderComponent,
    'datepicker': MaterialDatepickerComponent,
    'table': MaterialTableComponent
  }
}
