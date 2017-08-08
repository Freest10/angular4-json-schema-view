# Angular4-json-schema-view for web app

![json-web-app-logo](https://user-images.githubusercontent.com/20557044/28751960-eabb6b82-751c-11e7-8939-9e45b98e0560.png)

There are two similar modules besides my. The detailed instruction of my module as well as the explanation of it will be produced soon.

To install from NPM and use in your own project
```
npm install angular4-json-schema-view --save-dev
```

### Demo
<a href="https://github.com/Freest10/demo-angular4-json-schema-view">demo angular4-json-schema-view</a>

### Add to your module

```
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';

import {JsonSchemaViewModule} from 'angular4-json-schema-view'

import { AppComponent }         from './app.component';

@NgModule({
  imports:      [ BrowserModule, JsonSchemaViewModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

### Add to your component
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
       <json-schema-view
       [form]='yourJsonSchema'
       [model]='yourModel'
       [frameWorkName]='yourFrameWorkName'
       (inctanceOfWidgets)='yourIncstanceOfWidgetsFn($event)'
       (onChanges)='yourChangeFn($event)'
       (onSubmit)='yourOnSubmitFn($event)'
       >
  </json-schema-view>`
})
```

### Description

Json schema is not only a form generator, but also a frontend framework.
It’s compatible with <a href="http://schemaform.io/">AngularJs</a> and <a href="https://www.npmjs.com/package/angular2-json-schema-form">Angular2-json-schema-form</a>.

This project was created to improve the lack of <a href="https://www.npmjs.com/package/angular2-json-schema-form">angular2-json-schema-form</a>, which I encountered on a real project.
To do this, I had to write my own Json schema, based on <a href="https://www.npmjs.com/package/angular2-json-schema-form">angular2-json-schema-form</a>.

Disadvantages of the <a href="https://www.npmjs.com/package/angular2-json-schema-form">angular2-json-schema-form</a>, which I decided on in my project, are presented below:<br/>
1. Problem: if you want to track the events of the widget, you need to specify them in the json schema.

Example (problem):
```
form:{
 sendMes:{
   type: “button”,
   onClick: function(){...}
 }
}
```
If we get json from the server, then we cannot pass to function.
Solution: we can receive instances of the created widgets and subscribe to events or call the functions of the widget we need


Example (decision):
```
@Component({
    template: `<json-schema-view
                  [form]="yourJsonSchema"
                  [model]="yourModel"
                  (onChange)="yourChangeFn($event)"
                  (instanceOfWidgets)="yourIncstanceOfWidgetsFn($event)"
                  (onSubmit)="yourOnSubmitFn($event)"
                >
                </json-schema-view>’
})
export class AppComponent implements OnInit {
	private inctanceOfWidgetsSchema: any;

	yourIncstanceOfWidgetsFn(widgets){
		this.inctanceOfWidgetsSchema = widgets;
		    this.inctanceOfWidgetsSchema["send"].widgetSubject.subscribe(
            (type) => {
                if('buttonClick') this.fnClikc()
            })
        
        //function which update list data find in list widget
        this.inctanceOfWidgetsSchema["tasks"].getSelectListByReqest(“/api/books”)
    }
        
    fnClikc(){
    //yourfunctionClikc
    }
}
```

2. You can pass value types of arrays and objects to the widgets.
And the same widget can receive and return several types of values ​​of an array or object, it is enough to change only the type of the widget in "form"

Example:
```
"schema": {
    "type": "object",
    "properties": {
      "favorite": {
        "title": "Favorite",
        "type": "object", // you can change on “string”
        "enum": [
          "1",
          "undefined",
          "null",
          "NaN"
        ]
      }
    }
```
if “object” then out data is {“value:”...”, “text”:”...”}
if “string” then out data is “...”

You can create your own widgets with the types string, number, boolean, array and object as well as get the output of the corresponding types.
<a href="https://github.com/Freest10/demo-angular4-json-schema-view">show demo</a> 

3. Error processing.
You can give each widget an error text message, if it is required, i.e. if there is an insufficient number of characters (minlength), the number of characters (maxlength) is exceeded or the value does not match the pattern.
You can also set styles to a block with errors by assigning it a class
(errorClass: “myErrorClass”).

Example:
```
{
  "schema": {
    "type": "object",
    "properties": {
      "last_name": {
        "title": "Phone",
        "type": "string"
      }
    },
    "required": ["last_name"]
  },
  "form": [
    {
      "type": "section",
      "htmlClass": "row",
      "items": [
        {
          "key": "last_name",
          "type": "string",
          "minLength": 4,
          "maxLength": 10,
          "pattern": "[0-9]+",
          "validateMessages":{
            "required": "It is reqired field!",
            "minLength": "Minlength of this field is 4 symbols!",
            "maxLength": "Maxlength of this field is 10 symbols!",
            "pattern": "No pattern, just numbers symbols!"
          }
        }
      ]
    }
  ]
}
```
<a href="https://github.com/Freest10/demo-angular4-json-schema-view">show demo</a> 

4. If the data has been changed to null values, the Json schema will return the values ​​of these widgets as null, if the widget values ​​were not specified in the "model" and the widgets did not have a default value, then these widgets will not participate in the object when sending or changing the form.

Example:
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: <json-schema-view
  [form]="schema"
  [model]="model"
  (onSubmit)="submitFn($event)"
>
'',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	schema = {
  "schema": {
    "type": "object",
    "properties": {
      "first_name": {
        "title": "Name",
        "type": "string"
      }
    }
  },
  "form": [
    {
      "key": "first_name",
      "type": "string"
    },
    {
      "key": "send",
      "title": "Submit",
      "type": "submit"
    }
  ]
}
model: any = {
     "first_name": "Alex"
};
submitFn(value){

 /* if we delete value in input in browser and click submit button your value must be
 {  "first_name": null }
If there was no model, it would be value 
*/
console.log(value)
}
}
```

I left only the required functionality in the json diagram, that were verified by the real project.

If the widget written in the json schema is not correct, then by default the widget type will be “string”.

### Customizing

You can create your own widgets or redefine existing ones and connect them.

Example of a custom widget:
```
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'angular4-json-schema-view';

@Component({
  selector: 'custom-input-widget',
  template: `
    <div>
        <!-- Your code -->
    </div>
  `,
})
export class CustomInputComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any;
  controlName: string;
  options: Object;
  @Input() layoutNode;


  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }

}
```

<h4>Connecting a Custom Widget</h4>
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {JsonSchemaViewModule} from "angular4-json-schema-view"
import { AppComponent } from './app.component';
import { WidgetsService } from 'angular4-json-schema-view';
import { CustomInputComponent } from './custom_widgets/custom-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputComponent
  ],
  imports: [
    BrowserModule,
    JsonSchemaViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomInputComponent]
})
export class AppModule {

  constructor(private widgetService: WidgetsService) {
// connect thr custom widget
   this.widgetService.registerWidget('string', CustomInputComponent); 
  }

}
```
### Setting json schema.

Setting global settings.
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {JsonSchemaViewModule} from "angular4-json-schema-view"
import { JsonSchemaShareOptionsService } from 'angular4-json-schema-view';
import {  MdSelectModule, MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    JsonSchemaViewModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(private schemaShareOptions: JsonSchemaShareOptionsService) {
     let shareOptions = {
       "apiUrl": "api2", // a string to be added to the beginning of the query in all widgets
       "frameWorkName": 'material-design'
     }
    // set global options of json schema
    this.schemaShareOptions.setShareOptions(shareOptions);
  }

}
```
Setting local settings.
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<json-schema-view 
    [frameWorkName]="frameWorkName" 
    [options]=”options”
    (inctanceOfWidgets)="inctanceOfWidgets($event)"></json-schema-view>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // you can specify the name of the framework directly or through options
    frameWorkName = "material-design";
    //local settings for json schema
    options = {
        "apiUrl": "api",
        "frameWorkName": 'material-design'
    }
}
```
