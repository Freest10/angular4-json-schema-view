import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import {MaterialDesignLibraryService}       from '../material-design-framework/material-design.service';
import { BASIC_WIDGETS }                    from './index';
import {MaterialInputComponent}             from '../material-design-framework/material-input.component';
import { MATERIAL_WIDGETS }                 from '../material-design-framework';
//import { FlexLayoutModule }                 from '@angular/flex-layout';
import { ShareWidgetMethodsService }        from '../share/share-widgets-methods.service';

import { HttpModule }                       from '@angular/http';

import {
  MaterialModule, MdDatepickerModule, MdNativeDateModule
} from '@angular/material';


@NgModule({
  imports:         [ CommonModule, FormsModule, BrowserAnimationsModule, MaterialModule, MdDatepickerModule, MdNativeDateModule, /*FlexLayoutModule,*/ HttpModule ],
  declarations:    [ ...BASIC_WIDGETS, ...MATERIAL_WIDGETS ],
  exports:         [ ...BASIC_WIDGETS, ...MATERIAL_WIDGETS ],
  entryComponents: [ ...BASIC_WIDGETS, ...MATERIAL_WIDGETS ],
  providers:       [  MaterialDesignLibraryService, ShareWidgetMethodsService ]
})
export class WidgetLibraryModule { }
