import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./auth.middleware.js";
import * as express from "express";
export const routes = function () {
  var router = express.Router();
  router.get("/user", function (req, res) {
    res.json({ nour: "noura" });
  });

  router.post("/user", createUser);

  router.put("/user/:id", updateUser);

  router.delete("/users/:id", deleteUser);
  router.get("/users/list", getAllUsers);
  return router;
};
