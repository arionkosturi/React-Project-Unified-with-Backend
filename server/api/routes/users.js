const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const mongoose = require("mongoose");

// Get Users
router.get("/", (req, res, next) => {
  Users.find()
    .sort()
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Post Users
// router.post("/", (req, res, next) => {
//   const user = new Users({
//     // _id: mongoose.Types.ObjectId(),
//     username: req.body.username,
//     password: req.body.password,
//   });
//   user
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: "User was created",
//         createdUser: user,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

router.post("/", (req, res, next) => {
  const user = new Users({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isLoggedIn: req.body.isLoggedIn,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User was created",
        createdUser: result,
      });
    })
    .catch((err) => {
      console.log(err.errmsg);

      res.status(500).json({
        error: err.message,
      });
    });
});

// Get User by ID
router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  Users.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for this id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update User
router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  Users.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Delete User

router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  Users.findOneAndDelete({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
