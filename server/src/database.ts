import mongoose from "mongoose";

import { database } from "./env";

export const connectDB = () => {
  const { host, port, name } = database;

  mongoose
    .connect(`mongodb://${host}:${port}/${name}`)
    .then(() => console.log("Mongodb is connected successfully"))
    .catch(() => console.log("DB connection errors"));
};
