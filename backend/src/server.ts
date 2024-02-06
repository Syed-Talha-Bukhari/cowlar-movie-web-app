import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import { connectToDB } from "./config/connection";

dotenv.config();

const PORT = process.env.PORT_NUMBER;

const DB = process.env.MONGODB_CONNECTION_STRING?.replace(
  "<USERNAME>",
  process.env.MONGODB_CONNECTION_STRING_USERNAME ?? ""
)?.replace("<PASSWORD>", process.env.MONGODB_CONNECTION_STRING_PASSWORD ?? "");

connectToDB(DB ?? "");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
