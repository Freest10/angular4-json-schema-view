import { Injectable } from '@angular/core';

@Injectable()
export class ModelOfSchemaService {

  fullModel: Object = {};
  schemaList: Object;
  model: Object;

  getFullModelValue(schemaList, model){
    try{

      this.fullModel = {};

      if(schemaList){
        this.setSchemaList(schemaList);
      }else{
        throw new Error("Schema was missing");
      }

      let fullModelErros;
      if(model){
        this.setModel(model);
        fullModelErros= this.setFullModelBySchemaListAndModel();
      }else{
        fullModelErros= this.setFullModelBySchemaList();
      }

      if(fullModelErros instanceof Error){
        throw fullModelErros;
      }

      return this.fullModel;
    }catch(e){
      console.error(e);
      return new Error("Model is not valid")
    }
  }

  setModel(model){
    this.model = model;
  }

  setSchemaList(schemaList){
    this.schemaList = schemaList;
  }

  setFullModelBySchemaList(){
    for(let schemaProp in this.schemaList){
      if(this.schemaList[schemaProp]){
        if(this.schemaList[schemaProp].hasOwnProperty("default")){
          this.fullModel[schemaProp] = this.schemaList[schemaProp]["default"];
        }
      }
    }
  }

  setFullModelBySchemaListAndModel(){
    for(let schemaProp in this.schemaList){
      if(this.model[schemaProp]) {
         if(this.isCorrectWidgetValueType(schemaProp, this.schemaList,this.model[schemaProp])){
           this.fullModel[schemaProp] = this.model[schemaProp];
           continue;
         }else{
          return new Error(`${schemaProp} is not valid data`);
         }
      }
      if(this.schemaList[schemaProp]){
        if(this.schemaList[schemaProp].hasOwnProperty("default")){
          if(this.isCorrectWidgetValueType(schemaProp, this.schemaList, this.schemaList[schemaProp]["default"])){
            this.fullModel[schemaProp] = this.schemaList[schemaProp]["default"];
          }else{
            return new Error(`${schemaProp} is not valid data`);
          }
        }
      }
    }
  }

  isCorrectWidgetValueType(widgetName, schemaPropList, value): boolean{
    if(widgetName){
      if(value === null) return true;
      let typeDataWidget = schemaPropList[widgetName].type;
      if(typeDataWidget == 'string' || typeDataWidget == 'boolean'){
        if(typeof value == typeDataWidget){
          return true;
        }else{
          return false;
        }
      }else if(typeDataWidget == 'number' || typeDataWidget == 'integer'){
        if(typeof value == 'number'){
          return true;
        }else{
          return false;
        }
      }else if(typeDataWidget == 'array' && !schemaPropList[widgetName].hasOwnProperty("items")){
        if(value instanceof  Array){
          return true;
        }else{
          return false;
        }
      }else if(typeDataWidget == 'object' && !schemaPropList[widgetName].hasOwnProperty("items")){
        if(value instanceof  Object && !(value instanceof  Array)){
          return true;
        }else{
          return false;
        }
      }
    }
    return false;
  }

}
