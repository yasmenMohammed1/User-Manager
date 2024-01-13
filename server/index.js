import express from "express";
import cors from "cors";
import { sdk } from "./firebase.sdk.js";
import { routes } from "./routes.js";

const webapi = express();
webapi.use(express.json());
webapi.use(express.urlencoded({ extended: false }));

webapi.use(cors());

webapi.use("/api", routes(sdk));

webapi.use("/api/*", function (req, res, next) {
  res.status(404);
  const err = new Error("404");
  err["status"] = 404;
  next(err);
});

webapi.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    code: err.code || "UNKNOWN",
  });
});
const port = process.env.PORT || 10000;

webapi.listen(port, function (err) {
  console.log("listning to " + port);

  if (err) {
    console.log(err);
    return;
  }
});
