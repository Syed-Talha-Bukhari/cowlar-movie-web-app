
interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  phone: string;
}

export {IUser};