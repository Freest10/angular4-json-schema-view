import { Injectable } from '@angular/core';

@Injectable()
export class ShareWidgetMethodsService {


  setSelectList(widgetInstance, noFirstEmpty?){
      let resultSelectList = [];
      let enums = widgetInstance.options.enum;
      let titleMap = widgetInstance.options.titleMap;

      if(!noFirstEmpty){
        let selectList = {};
        selectList["text"] = "";
        selectList["value"] = null;
        resultSelectList.push(selectList);
      }

      if(enums){
        if(enums.length > 0){
          if(titleMap){
            enums.forEach((item)=>{
              let selectList = {};
              selectList["value"] = item;

              if(titleMap[item]){
                selectList["text"] = this.getValueFromTitleMap(item, titleMap);
              }else{
                selectList["text"] = item;
              }
              resultSelectList.push(selectList);
            })
          }else{
            enums.forEach((item)=>{
              let selectList = {};
              selectList["text"] = item;
              selectList["value"] = item;
              resultSelectList.push(selectList);
            })
          }
        }
      }

      widgetInstance.selectList = resultSelectList;
  }


  private getValueFromTitleMap(name, titleMap){
    if(titleMap instanceof Array){
      for(let instanceTitleMap of titleMap){
        if(instanceTitleMap.name == name){
          return instanceTitleMap.value;
        }
      }
    }else if(titleMap instanceof Object){
      return titleMap[name];
    }
  }


  inArray(
    item: any|any[], array: any[]
  ): boolean {
    if (!(array instanceof Array)) { return false; }
    if (item instanceof Array) {
      for (let subItem of item) {
        if (array.indexOf(subItem) !== -1) { return true; }
      }
    } else {
      return array.indexOf(item) !== -1;
    }
  }


}
