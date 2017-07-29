# angular4-json-schema-view

To install from NPM and use in your own project
```
npm install angular4-json-schema-view --save-dev
```

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


