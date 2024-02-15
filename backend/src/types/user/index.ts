interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  matchPassword(arg0: string): boolean;
  encryptPassword(arg0: string): string;
}

export { IUser };
