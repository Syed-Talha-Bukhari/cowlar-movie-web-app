import mongoose, { Document, Model } from "mongoose";
import { IUser } from "../../types/user";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z\s]+$/.test(value);
        },
        message: "Name must contain only alphabets and spaces",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password should be atleast 8 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
      validate: {
        validator: function (value: string) {
          return /^\92\d{10}$/.test(value);
        },
        message: "Invalid Phone number format",
      },
    },
  },
  { collection: "User" }
);

userSchema.methods.encryptPassword = async (pass_: string)=> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = bcrypt.hash(pass_, salt);
  return hash;
};

userSchema.methods.matchPassword = async function (pass_: string) {
  const match = await bcrypt.compare(pass_, this.password);
  return match;
};

userSchema.pre<IUser>("save", async function (next: any) {
  this.password = this.encryptPassword(this.password);
  next();
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
