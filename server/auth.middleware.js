import { getAuth } from "firebase-admin/auth";

export const getAllUsers = function (req, res, next) {
  getAuth()
    .listUsers(1000)
    .then((listUsersResult) => {
      res.json(listUsersResult);
    })
    .catch((error) => {
      next(error);
    });
};

export const createUser = function (req, res, next) {
  getAuth()
    .createUser({ ...req.body })
    .then((userRecord) => {
      res.send(userRecord);
    })
    .catch((error) => {
      next(error);
    });
};

export const updateUser = function (req, res, next) {
  getAuth().updateUser(req.params.id, {
    ...req.body,
  });
  getAuth()
    .setCustomUserClaims(req.params.id, { phone: req.body.phoneNumber })
    .then((userRecord) => {
      res.json(userRecord);
    })
    .catch((error) => {
      next(error);
    });
};

export const deleteUser = (req, res, next) => {
  getAuth()
    .deleteUser(req.params.id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
      next(error);
    });
};
