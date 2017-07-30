# angular4-json-web-app
<div style="margin:auto;">
![json-web-app-logo](https://user-images.githubusercontent.com/20557044/28751960-eabb6b82-751c-11e7-8939-9e45b98e0560.png)
</div>
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
