export interface IAccount {
  name: string;
  email: string;
  password: string;
  status: string;
  verify: boolean;
  roles: Array<string>;
}
