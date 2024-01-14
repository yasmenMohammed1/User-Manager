import { getAuth } from "firebase-admin/auth";

export const getAllUsers = function (req, res) {
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
  console.log("req.body", req.body);
  getAuth()
    .createUser({ displayName: req.body.name, ...req.body })
    .then((userRecord) => {
      console.log("Successfully created new user:", userRecord);
      getAuth()
        .setCustomUserClaims(userRecord.uid, { phone: req.body.phone })
        .then(() => {
          res.send(userRecord);
        });
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      next(error);
    });
};

export const updateUser = function (req, res, next) {
  getAuth().updateUser(req.params.id, {
    ...req.body,
  });
  getAuth()
    .setCustomUserClaims(req.params.id, { phone: req.body.phone })
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
