import { Boi } from './builder';
import { FormValidations } from './director';
import { Validator } from './product';

// Factory class
// depend on form field we initializing validation class
export class ValidationsFactory {
  constructor(private director: FormValidations) {}
  createValidation(formField: keyof FormValidations): Validator {
    if (this.director[formField]) {
      const builder = new Boi();
      this.director[formField](builder);
      return builder.getResult();
    }
    // empty validator
    return new Validator();
  }
}