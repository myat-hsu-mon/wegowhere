import { Application } from "express";
import { app } from "./env";

export const listenServer = (application: Application) => {
  const { port } = app;
  application.listen(port, () => {
    console.log("The server is listening on port: ", port);
  });
};
