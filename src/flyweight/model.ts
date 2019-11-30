export enum Permissions {
  Read,
  Edit,
  Create,
  Delete,
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  permissions: Permissions[];
}