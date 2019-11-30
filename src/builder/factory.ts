import { Boi } from './builder';
import { FormValidations } from './director';
import { Validator } from './product';

// Factory class
// depend on form field we initializing validation class
export class ValidationsFactory {
  createValidation(
    formField: keyof FormValidations,
    director: FormValidations
  ): Validator {
    if (director[formField]) {
      const builder = new Boi();
      director[formField](builder);
      return builder.getResult();
    }
    // empty validator
    return new Validator();
  }
}