import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'camelToKebab'
})
export class CamelToKebabPipe implements PipeTransform {
  transform(camelCaseString: string): string {
    return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
