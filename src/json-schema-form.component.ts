import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
  OnChanges, OnInit
}                                           from '@angular/core';
import { FormGroup }                        from '@angular/forms';
import { JsonSchemaFormService }            from './json-schema-form.service';
import { WidgetsService }                   from './widget-library/widgets.service';
import { JsonSchemaShareOptionsService }    from './share/json-schema-share-options.service';
import { RequestsDataService }              from './share/requests-data.service';


@Component({
  selector: 'json-schema-view',
  template: `
    <form (ngSubmit)="submitForm()">
      <root-widget [layout]="jsf.layout" ></root-widget>
    </form>
  `,
  providers: [ JsonSchemaFormService, RequestsDataService ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonSchemaViewComponent implements OnChanges, OnInit {
  // Recommended inputs
  @Input() schema: any; // The JSON Schema
  @Input() options: any; // The global form options
  // Alternate combined single input
  @Input() form: any; // For testing, and JSON Schema Form API compatibility
  // Angular Schema Form API compatibility inputs
  @Input() model: any; // Alternate input for data model
  @Input() frameWorkName: any; // Alternate input for data model

  // Outputs
  @Output() onChanges = new EventEmitter<any>(); // Live unvalidated internal form data
  @Output() onSubmit = new EventEmitter<any>(); // Complete validated form data
  @Output() inctanceOfWidgets = new EventEmitter<any>();
  private formOfSchema: Object;

  constructor(
   private wdgts: WidgetsService,
   private jsf: JsonSchemaFormService,
   private schemaShareOptions: JsonSchemaShareOptionsService
  ) { }

  ngOnInit() {
    this.initializeForm();

  }

  ngAfterViewInit(){
    this.getInctanceOfWidgets();
  }

  ngOnChanges() {
    this.resetSchema();
    this.initializeForm();
  }

  resetSchema(){
    this.jsf.resetFormGroup();
  }

  subscribeOnFormGroupValueChanges(){
    if(this.jsf.formGroup){
      this.jsf.formGroup.valueChanges.subscribe(data => {
        this.jsf.data = this.jsf.filterData(data);
        this.onChanges.emit(this.jsf.data);
      })
    }
  }

  getInctanceOfWidgets(){
    this.inctanceOfWidgets.emit(this.jsf.instanceOfWidgets)
  }

  public initializeForm(): void {

    this.setDefaultWidgetATJsf();
    this.jsf.setWidgetLibrary(this.wdgts);

    this.jsf.setJsonSchemaShareOptions(this.schemaShareOptions.shareOptions);

    if(this.options){
      this.jsf.setSchemaOptions(this.options);
    }

    if(this.frameWorkName){
      this.jsf.setSchemaOptions({"frameWorkName": this.frameWorkName});
    }

    if(this.model){
      this.jsf.setModel(this.model)
    }

    if(this.form){
      this.setSchema(this.form.schema);
      this.setJsfFormAndLayout(this.form.form);
      if(this.form.schema.required){
        this.setRequired(this.form.schema.required);
      }
    }

    this.subscribeOnFormGroupValueChanges();
  }

  setRequired(required){
    this.jsf.setRequired(required);
  }

  setSchema(schema){
    this.jsf.setSchema(schema);
 }

  setDefaultWidgetATJsf(){
    this.jsf.setDefaultWdget(this.wdgts.defaultWidget);
  }

  setJsfFormAndLayout(form){
    this.jsf.setForm(form);
    this.jsf.setLayout(form)
  }


  submitForm() {
    this.jsf.submitedForm();
    let validData = this.jsf.validData;
    if(JSON.stringify(validData) == "{}") validData = null;
    this.onSubmit.emit(validData);
  }
}
