import { Boi } from "./builder";

// Director class
// completes builder steps to get concrete products
export class FormValidations {
  // construct methods:
  name(builder: Boi) {
    builder.required().string().max(15).min(3).idiot();
  }
  email(builder: Boi) {
    builder.required().string().email();
  }
  bio(builder: Boi) {
    builder.string().max(250);
  }
  age(builder: Boi) {
    builder.number().min(18);
  }
}