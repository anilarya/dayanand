import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(_stringInput: String, _maxLength: any): any { 
     if ( ( _stringInput || '' ).length <= _maxLength) 
          return _stringInput;
      else 
          return _stringInput.substring(0, _maxLength-2) + "..";
  }
}