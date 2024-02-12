export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
}

export interface INewUser {
  email: string;
  password: string;
  name: string;
  phone: string;
}
