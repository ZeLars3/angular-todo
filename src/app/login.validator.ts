import { FormControl } from "@angular/forms";

export class LoginValidator {
  static login(control: FormControl): { [key: string]: boolean } {
    let symbolRegex = new RegExp(/[@~!#$%^&*()_+\-=?;:'",.<>\/\\]/);
    if (symbolRegex.test(control.value)) {
      return {
        invalidSymbol: true,
      };
    }
    return null;
  }
  static password(control: FormControl): { [key: string]: boolean } {
    let symbolRegex = new RegExp(/[@~!#$%^&*()_+\-=?;:'",.<>\/\\]/);
    if (symbolRegex.test(control.value)) {
      return {
        invalidSymbol: true,
      };
    }
    return null;
  }
}
