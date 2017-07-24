import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { JsonSchemaViewComponent }          from './json-schema-form.component';
import { JsonSchemaFormService }            from './json-schema-form.service';
import { WidgetLibraryModule }              from './widget-library/widget-library.module';
import { WidgetsService }                   from './widget-library/widgets.service';
import { JsonSchemaShareOptionsService }    from './share/json-schema-share-options.service';
import { RequestsDataService }              from './share/requests-data.service';
import { ModelOfSchemaService }             from './share/model-of-schema.component';


@NgModule({
    imports: [
        CommonModule, FormsModule, WidgetLibraryModule
    ],
    declarations: [ JsonSchemaViewComponent ],
    exports: [ JsonSchemaViewComponent, WidgetLibraryModule ],
    providers: [ JsonSchemaShareOptionsService, JsonSchemaFormService, WidgetsService, RequestsDataService, ModelOfSchemaService ]
})
export class JsonSchemaViewModule { }
