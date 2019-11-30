import { User, FlyweightState } from "./model";

// so idea is - except of having 1k+ instances of objects
// with weight common field, we can create 4-5 instances of those field
// and set it to proto of objects, accordingly to field value

// Using js native prototype here
// save "permissions" in cache and add proto link to it for new user instance
const createCachedUser = (
  { firstName, lastName, permissions, id }: User,
  cache: FlyweightState["cache"]
) => {
  const permKey = permissions.toString();
  if (!cache[permKey]) {
    cache[permKey] = { permissions };
  }
  const result = Object.create(cache[permKey]);
  result.id = id;
  result.firstName = firstName;
  result.lastName = lastName;
  return result;
}

// Usually, in this case, flyweight version will look like:
// 
// class CaseA
//  permissions: [A]
//  users: [User]
// 
// class CaseB
//  permissions: [A, B, C]
//  users: [User]
// 
// but we need one array of all user, which require additional concat on each render.
// As it can lose our performance advantage, we move flyweight instances separately from their context
// AND CONNECTING THEM BY PROTO
// ...
// so we are using modified flyweight for users collection
export const normalize = (users: User[]): FlyweightState => {
  const cache: { [k: string]: any } = {};
  return {
    users: users.map(user => createCachedUser(user, cache)),
    cache,
  };
}