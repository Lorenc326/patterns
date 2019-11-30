import { v4 } from "uuid";
import random from "random-name";

import { User, Permissions } from "./model";

const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomPermissions = () => new Array(randomNum(0, 4))
  .fill(null)
  .map((_, i) => Permissions[i] as unknown as Permissions);

const mocks = new Array(10000)
  .fill(null)
  .map(() => ({
    id: v4(),
    firstName: random.first(), 
    lastName: random.last(),
    permissions: getRandomPermissions()
  }));

export const HttpClient = {
  getUsers(): Promise<User[]> {
    return Promise.resolve(mocks);
  }
}