import { FormControl } from "@angular/forms";
export class TodoValidator {
  static validateSymbol(control: FormControl): { [key: string]: boolean } {
    let symbolRegex = new RegExp(/[@~!#$%^&*()_+\-=?;:'",.<>\/\\]/);
    if (symbolRegex.test(control.value)) {
      return {
        invalidSymbol: true,
      };
    }
    return null;
  }
}
