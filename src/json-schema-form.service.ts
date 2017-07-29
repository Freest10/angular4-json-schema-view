import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelOfSchemaService } from './share/model-of-schema.component';

@Injectable()
export class JsonSchemaFormService {
  public model: Object = null;
  public form: Object;
  public schema: Object;
  public widgetLibrary: any;
  public instanceOfWidgets: Object = {};
  public widgetOptions: any;
  protected activeFramework: string = 'none';
  private excludePropsFromOptions: Array<string> = ['items', 'tabs', 'key', 'type', 'formGroupInArr', 'referenceAddTab', 'valueType'];
  private excludePropsFromAssignLayoutAndSchemaPropList: Array<string> = ['items'];
  private schemaPropList: Object;
  public formGroup: FormGroup;
  public data;
  private isValid = null;
  public validData = null;
  private required: Array<String>;
  layout: any;
  private layoutToValidate: any;
  private fullModel: any;
  filteredData: any;
  submited: boolean = false;
  schemaOptions: Object = {
    "defaultWidget": "string"
  }
  shareSchemaOptions: Object = { }

  constructor(private modelOfSchemaService: ModelOfSchemaService){
    this.resetFormGroup();
  }

  resetFormGroup(){
    this.formGroup = new FormGroup({});
    this.formGroup.valueChanges.subscribe(v => {
      if(this.formGroup.valid){
        this.validData = this.filterData(v)
      }else{
        this.resetValidData();
      }
    });
  }

  setSchemaOptions(options){
    this.schemaOptions = Object.assign(this.schemaOptions,this.shareSchemaOptions,options);
    if(this.schemaOptions["frameWorkName"]){
      this.setActiveFramework(this.schemaOptions["frameWorkName"]);
      this.widgetLibrary.setActiveWidgetsByFrameWorkName(this.schemaOptions["frameWorkName"]);
    }
  }

  setJsonSchemaShareOptions(shareOptions){
    this.shareSchemaOptions = Object.assign(this.shareSchemaOptions, shareOptions);
  }

  isNoEmptyValueForJsonSchema(value){
    if(value === null || value === ""){
      return false;
    }
    return true;
  }

  filterData(data){
    this.filteredData = {};
    this.filteringObjectData(data);
    return this.filteredData;
  }

  private filteringArrayData(data, name, resultObject?){
    if(data.length > 0){

      let resultArr;
      if(resultObject){
        resultObject[name] = [];
        resultArr = resultObject[name];
      }else{
        this.filteredData[name] = [];
        resultArr = this.filteredData[name];
      }

      data.forEach((item)=>{
        let clearedObject = this.clearObjectValue(item);
        if(clearedObject) resultArr.push(clearedObject);
      })
    }
  }

  clearObjectValue(object){
    let resultObject = {};
    for(let item in object){
      if(this.schemaPropList[item]){
        if(!this.schemaPropList[item]["notSubmit"]){
            let value = object[item];
            if(this.isNoEmptyValueForJsonSchema(value) ||
              (!this.isNoEmptyValueForJsonSchema(value) && !this.isNoEmptyValueForJsonSchema(this.fullModel[item]) && this.fullModel.hasOwnProperty(item))
            ){
               resultObject[item] = object[item];
            }
          }
      }
    }
    if(JSON.stringify(resultObject) !== "{}") return resultObject;
  }

  private filteringObjectData(data, type?, resultObject?){
    for(let item in data){
      if(this.schemaPropList[item]){
        if(!this.schemaPropList[item]["notSubmit"]){
          if(data[item] instanceof Array){
            this.filteringArrayData(data[item],item, resultObject);
          }else{
            let value = data[item];
            if(this.isNoEmptyValueForJsonSchema(value) ||
              (!this.isNoEmptyValueForJsonSchema(value) && !this.isNoEmptyValueForJsonSchema(this.fullModel[item]) && this.fullModel.hasOwnProperty(item))
            ){
              if(resultObject){
                resultObject[item] = data[item];
              }else{
                this.filteredData[item] = data[item];
              }
            }
          }
        }
      }
    }
  }

  resetValidData(){
    this.validData = null;
  }

  updateValue(ctx: any, value): void {
    try{
      value = this.correctToTypeValue(ctx, value);
      if(!this.modelOfSchemaService.isCorrectWidgetValueType(ctx.controlName, this.schemaPropList, value)) throw new Error(`No valid data on key - ${ctx.controlName}`);
      ctx.formControl.setValue(value);
    }catch(e){
     console.error(e);
    }
  }

  correctToTypeValue(widget, value){
    if(widget.hasOwnProperty('controlName')){
      if(value === null) return null;
      let typeDataWidget = this.schemaPropList[widget.controlName].type;
      if(typeDataWidget == 'string'){
        if(typeof value != typeDataWidget){
          return String(value);
        }
      }else if(typeDataWidget == 'number' || typeDataWidget == 'integer'){
        if(typeof value != 'number'){
          let parsedVale = parseFloat(value);
          if(!isNaN(parsedVale)){
            return parsedVale;
          }else{
            return null;
          }
        }else{
          if(value === NaN) return null;
        }
      }
    }
    return value;
  }

  setActiveFramework(name){
    if(this.widgetLibrary.frameworkWidgets.hasOwnProperty(name)){
      this.activeFramework = name;
    }else{
      this.activeFramework = "none";
      //console.error("There is no framework");
    }
  }

  getItemFromSchemaPropListByKey(key){
    if(this.schemaPropList && key){
      if(this.schemaPropList.hasOwnProperty(key)){
        return this.schemaPropList[key];
      }
    }
    return null;
  }

  generateOptions(item){
    let propFromSchema = this.getItemFromSchemaPropListByKey(item["key"]);
    let concatItem;
    if(propFromSchema){
      concatItem = Object.assign({},propFromSchema, item); //concat data from schema & form by options
    }else{
      concatItem = item;
    }
    let layout = {
      options: {}
    };
    for(let prop in concatItem){
      if(this.excludePropsFromOptions.indexOf(prop) > -1){
        layout[prop] = concatItem[prop];
      }else{
        layout.options[prop] = concatItem[prop];
      }
    }
    return layout;
  }

  getActiveFramework(){
    return this.activeFramework;
  }

  setForm(form){
    this.form = form;
  }

  setLayout(form){
    try{
      let [...layout] = form;
      this.layoutToValidate = layout;
      this.assignLayoutAndSchemaPropList(this.layoutToValidate);
      let fullModelValue = this.modelOfSchemaService.getFullModelValue(this.schemaPropList, this.model);
      if(fullModelValue instanceof Error) throw fullModelValue
      this.fullModel = fullModelValue;
      this.layout = this.layoutToValidate;
    }catch(e){
      console.error(e);
    }
  }

  createArrTypeFormGroup(item){
    //TODO: add Validation to Arr
    this.formGroup.addControl(item["key"], new FormArray([]));
  }

  pushFormGroupToFormArrAndReturnIt(formArr){
    let frmGrp = new FormGroup({});
    formArr.push(frmGrp);
    return frmGrp;
  }

  getFormArrByName(name){
    return this.formGroup.controls[name];
  }

  setTypeSectionToAllItems(items){
    items.forEach((item) => {
      item["type"] = "tab";
    })
  }

  wrapToLayout(item, key, wrapType, itemType = "section"){
    item = Object.assign({}, this.schemaPropList[key], item);
    let wrapLayotArray = {};
    wrapLayotArray["type"] = wrapType;
    wrapLayotArray["items"] = [];
    wrapLayotArray["arrKey"] = item["key"];
    wrapLayotArray["maxItems"] = item["maxItems"];
    item["type"] = itemType;
    wrapLayotArray["items"].push(item);
    return wrapLayotArray;
  }

  wrapToLayoutTabArr(item, key, wrapType, itemType = "section"){
    item = Object.assign({}, this.schemaPropList[key], item);
    let wrapToLayoutTabArr = {};
    wrapToLayoutTabArr["type"] = wrapType;
    wrapToLayoutTabArr["items"] = [];
    wrapToLayoutTabArr["arrKey"] = item["key"];
    wrapToLayoutTabArr["maxItems"] = item["maxItems"];
    wrapToLayoutTabArr["title"] = item["title"];
    wrapToLayoutTabArr["addButtonTitle"] = item["addButtonTitle"];
   item["type"] = itemType;
    wrapToLayoutTabArr["items"].push(item);
    return wrapToLayoutTabArr;
  }

  createReferenceToLayout(item, formArr, wrapLayotArray){
    let refOptions = {};
    refOptions["type"] = "$ref";
    var arrItems = Object.assign({},item);
    let [...items] = item["items"];
    refOptions["reference"] =  arrItems;
    refOptions["addButtonTitle"] = items[0]["addButtonTitle"];
    refOptions["reference"]["items"] = items;
    refOptions["reference"]["currentItems"] = 1;
    refOptions["reference"]["formArrInstance"] = formArr;
    refOptions["layoutNodeToPushItems"] = wrapLayotArray;
    return refOptions;
  }

  createReferenceToTabLayout(item, formArr, wrapLayotArray){
    let refOptions = {};
    refOptions["type"] = "$ref";
    var arrItems = Object.assign({},item);
    let [...items] = item["items"];
    refOptions["reference"] =  arrItems;
    refOptions["addButtonTitle"] = items[0]["addButtonTitle"];
    refOptions["items"] = items;
    refOptions["currentItems"] = 1;
    refOptions["formArrInstance"] = formArr;
    refOptions["layoutNodeToPushItems"] = wrapLayotArray;
    return refOptions;
  }

  assignLayoutAndSchemaPropList(layout, formGroupInArr?){

    if(layout instanceof  Array) {
      if (layout.length > 0) {
        layout.forEach((item, num) => {

          if(item["type"]=="tabs"){

            item["items"] = item["tabs"];
            delete item["tabs"];
            this.setTypeSectionToAllItems(item["items"]);

          }else if(item.key){

            let key = this.getKeyFromSchemaByLayoutKey(item.key);
            var formGroupForArrayWidgets = formGroupInArr;

            if (this.schemaPropList[key]) {

              item = Object.assign({}, this.schemaPropList[key], item);
              item["key"] = key;
              item["valueType"] = this.schemaPropList[key]["type"];

              if(!(item["type"] == "array" && this.schemaPropList[key]["items"]) && item["type"] != "tabs" && item["type"] != "tabarray"){
                if(formGroupInArr) item["formGroupInArr"] = formGroupInArr;
                layout[num] = item;
              }

            }

            if(this.schemaPropList[key] && item["type"] == "array" && this.schemaPropList[key]["items"]){
              let wrapLayotArray = this.wrapToLayout(item, key, "section");
              this.createArrTypeFormGroup(item);
              let formArr = this.getFormArrByName(item["key"]);
              formGroupForArrayWidgets = this.pushFormGroupToFormArrAndReturnIt(formArr);
              item = wrapLayotArray;
              let reference = this.createReferenceToLayout(item, formArr, wrapLayotArray);
              wrapLayotArray["items"].push(reference);
              layout[num] = wrapLayotArray;
            }


            if(this.schemaPropList[key] && item["type"] == "tabarray" && this.schemaPropList[key]["items"]){

              let wrapLayotArray = this.wrapToLayoutTabArr(item, key, "tabs", "tab");
              this.createArrTypeFormGroup(item);
              let formArr = this.getFormArrByName(item["key"]);
              formGroupForArrayWidgets = this.pushFormGroupToFormArrAndReturnIt(formArr);
              item = wrapLayotArray;

              let reference = this.createReferenceToTabLayout(item, formArr, wrapLayotArray);
              wrapLayotArray["referenceAddTab"] = reference;
              let [...copiedItems] = reference["reference"]["items"];
              let refToPush = Object.assign({}, copiedItems[0]);
              refToPush["items"] = [];
              refToPush["dataType"] = "$ref";
              wrapLayotArray["items"].push(refToPush);
              layout[num] = wrapLayotArray;
            }
            //If widget is array
            if (item["items"]) {
              this.assignLayoutAndSchemaPropList(item["items"], formGroupForArrayWidgets); //
            }

          }else if(typeof item == "string"){
            let key = this.getKeyFromSchemaByLayoutKey(item);
            let defaultItemOptions = {};
            if(this.schemaPropList[key]["type"]){
              defaultItemOptions["type"] = this.schemaPropList[key]["type"];
            }else{
              defaultItemOptions["type"] = this.schemaOptions["defaulWidget"];
            }
            defaultItemOptions["key"] = key;

            if(formGroupInArr) defaultItemOptions["formGroupInArr"] = formGroupInArr;

            let itemObject = Object.assign(this.schemaPropList[key], defaultItemOptions);
            layout[num] = itemObject;

          }

          if(item["items"]) this.assignLayoutAndSchemaPropList(item["items"]);
        });
      }
    }

  }

  getKeyFromSchemaByLayoutKey(layoutKey){
    let arrLayotKey = layoutKey.split("[].");
    return arrLayotKey[(arrLayotKey.length - 1)];
  }

  setWidgetLibrary(widgetLibrary){
    this.widgetLibrary = Object.create(widgetLibrary);
  }

  initWidget(instanceOfWidget, item){
    this.setInstanceOfWidgets(instanceOfWidget, item);
  }

  protected setInstanceOfWidgets(instanceOfWidget, item){
    if(item.key) this.instanceOfWidgets[item.key] = instanceOfWidget;
  }

  setDefaultWdget(defaultWidget){
    this.schemaOptions["defaultWidget"] = defaultWidget;
  }

  setSchema(schema){
    this.schema = schema;
    this.resetSchemapropList();
    this.createSchemaPropsList(this.schema);
  }

  private resetSchemapropList(){
    this.schemaPropList = {};
  }

  private createSchemaPropsList(schema){
    if(schema.hasOwnProperty("properties") && schema.type == "object"){
      let schemaProps = schema.properties;
      for(let property in schemaProps){
        this.schemaPropList[property] = schemaProps[property];
        this.createSchemaPropsList(schemaProps[property]);

        if(schemaProps[property].hasOwnProperty("items") && schemaProps[property].type == "array"){
          this.createSchemaPropsList(schemaProps[property]["items"]);
        }
      }
    }
  }

  setRequired(required){
    this.required = required;
  }

  setModel(model){
    this.model = model;
  }

  setWidgetValueFromModel(ctx: any): boolean{
    try{
      if(this.fullModel && ctx.hasOwnProperty('controlName')){
        if(this.fullModel.hasOwnProperty(ctx.controlName)){
          if(!this.modelOfSchemaService.isCorrectWidgetValueType(ctx.controlName,this.schemaPropList, this.fullModel[ctx.controlName])) throw new Error(`Data is not valid on key - ${ctx.controlName}`);
          ctx.controlValue = this.fullModel[ctx.controlName];
          ctx.formControl.setValue(ctx.controlValue);
          return true;
        }
      }
      ctx.controlValue = null;
      return false;
    }catch(e){
      console.error(e);
    }
  }

  public disable(ctx: any, value){
    if(ctx.formControl){
      if(value){
        ctx.formControl.disable();
      }else{
        ctx.formControl.enable();
      }
    }
  }

  addToFormGroup(ctx: any, formGroup?){
    if(ctx.controlName){
      let formGroupInstance = this.formGroup;
      if(formGroup) formGroupInstance = formGroup;
      formGroupInstance.addControl(ctx.controlName, ctx.formControl);
    }
  }

  getControlFromFormGroupByName(name){
    return this.formGroup.get(name);
  }

  gerValidatorsForWidget(ctx: any){
    let validatorsArrray = [];
    if(ctx.hasOwnProperty("options")){
      if(ctx.options.hasOwnProperty("minLength")){
        validatorsArrray.push(Validators.minLength(ctx.options.minLength));
      }
      if(ctx.options.hasOwnProperty("maxLength")){
        validatorsArrray.push(Validators.maxLength(ctx.options.maxLength));
      }
      if(ctx.options.hasOwnProperty("pattern")){
        validatorsArrray.push(Validators.pattern(ctx.options.pattern));
      }
      if(this.required){
        if(this.required.indexOf(ctx.controlName) > -1){
          validatorsArrray.push(Validators.required);
        }
      }
    }
    return validatorsArrray;
  }

  initializeControl(ctx: any){
      ctx.formControl = this.getFormControl(ctx);
      this.setWidgetValueFromModel(ctx);
      this.setDisableToWidgetOfFormControl(ctx);
      this.setValueToWidgetOfFormControl(ctx);
      this.addToFormGroup(ctx, ctx.layoutNode.formGroupInArr);
  }

  getFormControl(ctx: any){
    let controlName = ctx.controlName;
    let formCntrol = this.formGroup.get(controlName);
    if(formCntrol instanceof FormControl){
      return formCntrol;
    }
    return new FormControl(null, this.gerValidatorsForWidget(ctx));
  }

  setValueFromFormGroup(ctx){
    ctx.controlValue = ctx.formControl.value;
  }

  setDisableToWidgetOfFormControl(ctx){
    ctx.controlDisabled = ctx.formControl.disabled;
    if(ctx.options){
      if(ctx.options.disabled){
        this.disable(ctx, ctx.options.disabled);
      }
    }
  }

  setValueToWidgetOfFormControl(ctx){
    ctx.formControl.valueChanges.subscribe(v => {
      if(v != ctx.controlValue) ctx.controlValue = v;
      if(ctx.formControl.disabled != ctx.controlDisabled) ctx.controlDisabled = ctx.formControl.disabled;
    });
  }

  addItem(ctx: any){
    let insertedObject = ctx.options.layoutNodeToPushItems.items;
    let formGroupInstance = this.pushFormGroupToFormArrAndReturnIt(ctx.options.reference.formArrInstance);
    let instanceOfItems = Object.assign({}, ctx.options.reference.items[0]);
    let itemsWithFormGroupInArr = this.addFormGroupRefToAllLayouts(instanceOfItems["items"], formGroupInstance);
    insertedObject.splice(-1,0, instanceOfItems);
    ctx.options.reference["currentItems"]++;
  }

  addTabItem(ctx: any){
    let [...copyItems] = ctx.layoutNode.referenceAddTab.items;
    let [...instanceOfItems] = copyItems[0]["items"];
    this.pushItemsFromReferenceToLayout(ctx, instanceOfItems);
    this.addTabToFromGroup(ctx);
    delete ctx.layoutNode.items[ctx.selectedItem]["dataType"];
    this.addEmptyTabItemToLayotNode(ctx);
  }

  addTabToFromGroup(ctx){
    let lastIndexItems = ctx.layoutNode.items.length-1;
    let lastItems = ctx.layoutNode.items[lastIndexItems];
    let formGroupInstance = this.pushFormGroupToFormArrAndReturnIt(ctx.layoutNode.referenceAddTab.formArrInstance);
    this.addFormGroupRefToAllLayouts(lastItems.items, formGroupInstance);
  }

  addEmptyTabItemToLayotNode(ctx){
    if (ctx.layoutNode.items.length < ctx.options.maxItems) {
      let [...copyItems] = ctx.layoutNode.referenceAddTab.items;
      let insertedObject = ctx.layoutNode.items;
      let objectToPush = {};
      objectToPush["dataType"] = "$ref";
      objectToPush["type"] = "tab";
      objectToPush["addButtonTitle"] = ctx.layoutNode.referenceAddTab.addButtonTitle;
      objectToPush["key"] = ctx.layoutNode.referenceAddTab.reference.arrKey;
      objectToPush["items"] = [];
      objectToPush["title"] = copyItems[0].title;
      objectToPush["typeAddable"] = "addable";
      insertedObject.push(objectToPush);
    }
  }

  pushItemsFromReferenceToLayout(ctx, refItems){
    if(refItems instanceof  Array){
      if(refItems.length > 0){
        refItems.forEach((refItem)=>{
          ctx.layoutNode.items[ctx.selectedItem].items.push(refItem);
        })
      }
    }

  }

  addFormGroupRefToAllLayouts(layouts, formGroup){
    if(layouts.length > 0){
      layouts.forEach((layout)=>{
        layout["formGroupInArr"] = formGroup;
      })
    }
    return layouts;
  }

  submitedForm(unSubmit?){
    unSubmit ? this.submited = false : this.submited = true;
  }

}
