import express from "express";
import routes from "./routes";

export const createServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/", routes);

  app.get("/", (req, res) => {
    res.status(200).send("OK!");
  });

  return app;
};
