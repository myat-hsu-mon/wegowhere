import dotenv from "dotenv";

dotenv.config();

export const app = {
  port: process.env.PORT || "4000",
  nodeEnv: process.env.NODE_ENV || "development",
};

export const jsonWebToken = {
  secretKey: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const database = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
};
