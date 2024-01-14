import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./auth.middleware.js";
import * as express from "express";
export const routes = function () {
  var router = express.Router();

  router.post("/user", createUser);

  router.put("/user/:id", updateUser);

  router.delete("/users/:id", deleteUser);
  router.get("/users/list", getAllUsers);
  return router;
};
