import express from "express";
import morgan from "morgan";
import api from "@api";

export default (app: express.Application) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  // logger
  app.use(morgan("dev"));

  // hide framework info
  app.disable("x-powered-by");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Setting View engine, static, viewdirectory,
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/../views");
  app.use(express.static(__dirname + "/../public"));

  app.use(api());

  app.use((req, res, next) => {
    const err: any = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });
};
