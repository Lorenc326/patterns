import { Value, Validation } from "./types";

// Product class
// validate depend on initialized validations chain
export class Validator {
  public validate(value: Value): undefined | string {
    for (const validator of this.chain) {
      const error = validator(value);
      if (error !== undefined) {
        return error;
      }
    }
    return undefined;
  }
  public chain: Validation[] = [];
}
