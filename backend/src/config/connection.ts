import mongoose from "mongoose";

export const connectToDB = (connString: string): void => {
  mongoose
    .connect(connString)
    .then((conn: any) => console.log("Database connection established"))
    .catch((err: any) => console.log(err));
};
