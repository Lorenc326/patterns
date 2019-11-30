export type Value = undefined | string | number | any[];
export type Validation = (v: Value) => undefined | string;