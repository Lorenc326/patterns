type Value = undefined | string | number | any[];
type Validation = (v?: string | number | []) => undefined | string;

class Validator {
  public validate(value): undefined | string {
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

class BoiBuilder {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  private add(v: Validation) {
    this.validator.chain.push(v);
    return this;
  }

  required() {
    return this.add(
      value => value !== undefined ? undefined : ""
    );
  }
  string() {
    return this.add(
      value => typeof value === "string" ? undefined : "Must be a string"
    );
  }
  number() {
    return this.add(
      value => typeof value === "number" ? undefined : "Must be a number"
    );
  }
  email() {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    return this.add(
      (value: string) => regex.test(value) ? undefined : "Email address invalid"
    );
  }
  max(num: number) {
    return this.add(
      value => typeof value === "number" ? 
        value <= num ? undefined : `Max value is ${num}`
        : value.length <= num ? undefined : `Max length is ${num}`
    );
  }
  min(num: number) {
    return this.add(
      value => typeof value === "number" ? 
        value >= num ? undefined : `Min value is ${num}`
        : value.length >= num ? undefined : `Min length is ${num}`
    );
  }
  idiot() {
    const idiotKeys = ["admin", "password", "qwerty", "12345", "name"]
    return this.add(
      (value: string) => !idiotKeys.includes(value) ? undefined : "Not safe value"
    );
  }
  specialKeys() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/igm;
    return this.add(
      (value: string) => regex.test(value) ? undefined
        : "At least one uppercase, lowercase letter and one number"
    );
  }

}