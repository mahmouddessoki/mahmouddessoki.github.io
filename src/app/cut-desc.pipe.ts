import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutDesc'
})
export class CutDescPipe implements PipeTransform {

  transform(desc : string,numberOfLetters : number): unknown {
    return desc.substr(0,numberOfLetters) + "......";
  }

}
