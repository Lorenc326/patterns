import { v4 } from "uuid";

import { Subscription } from "./types";

export class Publisher<T = any> {
  private subscriptions: Map<string, Subscription<T>> = new Map();

  subscribe(subscription: Subscription) {
    const key = v4();
    this.subscriptions.set(key, subscription);
    return () => this.remove(key);
  }

  remove(key: string) {
    this.subscriptions.delete(key);
  }

  execute(data: T) {
    console.log("heh", data);
    this.subscriptions.forEach(s => s(data));
  }

}