import { Validation } from "./types";
import { Validator } from "./product";

// Builder class
// construct and get product class 
export class Boi {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  private add(v: Validation) {
    this.validator.chain.push(v);
    return this;
  }

  public getResult() {
    return this.validator;
  }

  required() {
    return this.add(
      value => value !== undefined && value !== "" ? undefined : "field is required"
    );
  }
  string() {
    return this.add(
      value => typeof value === "string" ? undefined : "must be a string"
    );
  }
  number() {
    return this.add(
      value => typeof value === "number" ? undefined : "must be a number"
    );
  }
  email() {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    return this.add(
      value => regex.test(value as string) ? undefined : "email address invalid"
    );
  }
  max(num: number) {
    return this.add(
      value => typeof value === "number" ? 
        value <= num ? undefined : `Max value is ${num}`
        : value && value.length <= num ? undefined : `max length is ${num}`
    );
  }
  min(num: number) {
    return this.add(
      value => typeof value === "number" ? 
        value >= num ? undefined : `Min value is ${num}`
        : value && value.length >= num ? undefined : `min length is ${num}`
    );
  }
  idiot() {
    const idiotKeys = ["admin", "password", "qwerty", "12345", "name"]
    return this.add(
      value => !idiotKeys.includes(value as string) ? undefined : "not safe value"
    );
  }
  specialKeys() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/igm;
    return this.add(
      value => regex.test(value as string) ? undefined
        : "at least one uppercase, lowercase letter and one number"
    );
  }

}